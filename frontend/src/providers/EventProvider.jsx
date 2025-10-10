import { createContext, useContext, useState, useEffect, useRef } from "react";

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const didFetch = useRef(false); // to prevent double fetching in StrictMode

  // --- --- LOAD EVENTS --- ---
  useEffect(() => {
    if (didFetch.current) return; // skip second run
    didFetch.current = true;
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/events/my-events?userId=1" // hardcoded user ID for now
        );
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data); // replace old state, don’t append
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  // --- --- UPDATE EVENT --- ---
  const updateEvent = async (event) => {
    try {
      console.log("updating event: " + event.id);
      console.log(event);
      const res = await fetch(`http://localhost:8080/api/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      if (!res.ok) throw new Error("Failed to update event");
      const updated = await res.json();

      setEvents((prev) => prev.map((e) => (e.id === event.id ? updated : e)));

      console.log("event days: " + event.days[0].id);
      if (event.days && event.days.length > 0) {
        for (const day of event.days) {
          console.log(
            "trying to post: " +
              "dayId: " +
              day.id +
              " , dayTitle: " +
              day.title +
              " , dayDate: " +
              day.date +
              " , eventId: " +
              day.eventId
          );
          await fetch(`http://localhost:8080/api/days`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(day),
          });
        }
      }

      alert("Event and days saved successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  // --- --- CREATE EVENT --- ---
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
    <EventContext.Provider value={{ events, updateEvent, createEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEvents = () => useContext(EventContext);
