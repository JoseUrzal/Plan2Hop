import { createContext, useContext, useState } from "react";
import { useEffect, useRef } from "react";

const DaysContext = createContext();

export function DaysProvider({ children }) {
  const [days, setDays] = useState([]);
  const didFetch = useRef(false); // to prevent double fetching in StrictMode

  const fetchDayById = async (dayId) => {
    try {
      console.log("Fetching day by ID:", dayId);
      const res = await fetch(`http://localhost:8080/api/days/by-id/${dayId}`);
      if (!res.ok) throw new Error("Failed to fetch day by ID");
      const data = await res.json();

      // Update state with this day
      setDays((prev) => {
        // Replace day if it exists, or add it if it doesn't
        const exists = prev.some((d) => d.id === data.id);
        if (exists) {
          return prev.map((d) => (d.id === data.id ? data : d));
        } else {
          return [...prev, data];
        }
      });

      return data;
    } catch (err) {
      console.error("Error fetching day by ID:", err);
    }
  };

  const fetchDaysByEvent = async (eventId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/days/by-event?eventId=${eventId}`
      );
      if (!res.ok) throw new Error("Failed to fetch days");
      const data = await res.json();
      setDays(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  // pressing Save button
  const updateDatabase = async (daysToSave) => {
    try {
      const res = await fetch(`http://localhost:8080/api/days/bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(daysToSave),
      });
      if (!res.ok) throw new Error("Failed to save days");
      const saved = await res.json();
      setDays(saved);
      return saved;
    } catch (err) {
      console.error(err);
    }
  };

  const addDay = (day) => {
    setDays((prev) => [...prev, day]);
  };

  const deleteDay = (id) => {
    setDays((prev) => prev.filter((day) => day.id !== id));
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

  const deleteDayDatabase = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/days/${id}`, { method: "DELETE" });
      setDays((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DaysContext.Provider
      value={{
        days,
        fetchDaysByEvent,
        fetchDayById,
        addDay,
        updateDatabase,
        updateDay,
        deleteDayDatabase,
        deleteDay,
      }}
    >
      {children}
    </DaysContext.Provider>
  );
}

export const useDays = () => useContext(DaysContext);
