import { createContext, useContext, useState, useEffect, useRef } from "react";

const EventContext = createContext();

export function EventProvider({ children }) {
  // State to hold events
  const [events, setEvents] = useState([]);
  // Loading state
  const [loading, setLoading] = useState(true);

  const didFetch = useRef(false); // to prevent double fetching in StrictMode

  // Load events from backend when app starts
  useEffect(() => {
    if (didFetch.current) return; // skip second run
    didFetch.current = true;

    const fetchEvents = async () => {
      try {
        console.log("fetching events");
        const res = await fetch(
          "http://localhost:8080/api/events/my-events?userId=1" // hardcoded user ID for now
        );
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        console.log(data);

        setEvents(data); // replace old state, don’t append
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Update event (PUT)
  const updateEvent = async (event) => {
    try {
      console.log("updating event: " + event.id);
      console.log(event);
      const res = await fetch(`/api/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
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

  // Save new event (POST)
  const createEvent = async () => {
    try {
      console.log("creating event");
      const event = {
        title: "New Event",
        description: "",
        location: "",
        budgetLimit: 0,
        imagePath: "/backgrounds/myIcon.png",
        userId: 1, // assuming user ID 1 for now
        participantIds: [1], // assuming user ID 1 for now
      };
      console.log(event);
      const res = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
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
    <EventContext.Provider
      value={{ events, updateEvent, createEvent, loading }}
    >
      {children}
    </EventContext.Provider>
  );
}

export const useEvents = () => useContext(EventContext);
