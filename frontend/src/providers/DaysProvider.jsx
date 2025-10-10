import { createContext, useContext, useState } from "react";

const DaysContext = createContext();

export function DaysProvider({ children }) {
  const [days, setDays] = useState([]);

  const fetchDaysByEvent = async (eventId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/days/by-event?eventId=${eventId}`
      );
      if (!res.ok) throw new Error("Failed to fetch days");
      const data = await res.json();
      setDays(data);
      console.log("days: " + data.length);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const addDay = async (day) => {
    try {
      const res = await fetch(`http://localhost:8080/api/days`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(day),
      });
      if (!res.ok) throw new Error("Failed to add day");
      const saved = await res.json();
      setDays((prev) => [...prev, saved]);
      return saved;
    } catch (err) {
      console.error(err);
    }
  };

  const updateDay = async (day) => {
    try {
      const res = await fetch(`http://localhost:8080/api/days/${day.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(day),
      });
      if (!res.ok) throw new Error("Failed to update day");
      const updated = await res.json();
      setDays((prev) => prev.map((d) => (d.id === day.id ? updated : d)));
      return updated;
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDay = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/days/${id}`, { method: "DELETE" });
      setDays((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DaysContext.Provider
      value={{ days, fetchDaysByEvent, addDay, updateDay, deleteDay }}
    >
      {children}
    </DaysContext.Provider>
  );
}

export const useDays = () => useContext(DaysContext);
