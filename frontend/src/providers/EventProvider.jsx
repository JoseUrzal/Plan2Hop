import { createContext, useContext, useState, useEffect } from "react";

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load events from backend when app starts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/events/my-events?userId=1"
        );
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        console.log(data); // console
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // ✅ Update event (PUT)
  const updateEvent = async (id, updatedFields) => {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      if (!res.ok) throw new Error("Failed to update event");
      const updated = await res.json();

      setEvents((prev) =>
        prev.map((event) => (event.id === id ? updated : event))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Add new event (POST)
  const addEvent = async () => {
    try {
      const newEvent = {
        title: "New Event",
        description: "",
        location: "",
        budgetLimit: 0,
        days: [],
        imagePath: "/backgrounds/myIcon.png",
      };

      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      if (!res.ok) throw new Error("Failed to add event");
      const savedEvent = await res.json();

      setEvents([...events, savedEvent]);
      return savedEvent; // return so router can navigate
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <EventContext.Provider value={{ events, updateEvent, addEvent, loading }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEvents = () => useContext(EventContext);
