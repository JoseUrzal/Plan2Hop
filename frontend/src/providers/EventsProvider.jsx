import { createContext, useContext, useState, useEffect, useRef } from "react";

const EventContext = createContext();

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const didFetch = useRef(false); // to prevent double fetching in StrictMode

  const fetchEvents = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/events/my-events?userId=1" // hardcoded user ID for now
      );
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data); // replace old state, don’t append
    } catch (err) {}
  };

  // --- --- LOAD EVENTS --- ---
  useEffect(() => {
    if (didFetch.current) return; // skip second run
    didFetch.current = true;
    fetchEvents();
  }, []);

  // --- --- UPDATE EVENT --- ---
  const updateEvent = async (event) => {
    try {
      // prepare DTO for backend
      const dto = {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        budgetLimit: event.budgetLimit,
        imagePath: event.imagePath,
        userId: event.user?.id || event.userId, // just send ID, not full object
        participantIds: event.participantIds || [],
      };

      const res = await fetch(`http://localhost:8080/api/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
      if (!res.ok) throw new Error("Failed to update event");

      const updated = await res.json();

      setEvents((prev) => prev.map((e) => (e.id === event.id ? updated : e)));

      // post days separately
      if (event.days && event.days.length > 0) {
        for (const day of event.days) {
          const cleanDay = {
            id: day.id,
            title: day.title,
            date: day.date,
            eventId: event.id, // don't send full event
          };
          await fetch(`http://localhost:8080/api/days`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cleanDay),
          });
        }
      }
      alert("Event saved successfully!");
      await updateEventDays(event);
    } catch (err) {}
  };

  // --- UPDATE DAYS OF EVENT ---
  const updateEventDays = async (event) => {
    try {
      console.log("🔄 Syncing days for event:", event.id);

      // 1️⃣ Fetch current days from DB
      const res = await fetch(
        `http://localhost:8080/api/days/by-event?eventId=${event.id}`
      );
      if (!res.ok) throw new Error("Failed to fetch event days");
      const existingDays = await res.json();

      // 2️⃣ Determine which to add, update, or delete
      const daysToAdd = event.days.filter(
        (d) => !existingDays.some((db) => db.id === d.id)
      );

      const daysToDelete = existingDays.filter(
        (db) => !event.days.some((d) => d.id === db.id)
      );

      // Optional: only if you want to detect title/date edits
      const daysToUpdate = event.days.filter((d) =>
        existingDays.some(
          (db) => db.id === d.id && (db.title !== d.title || db.date !== d.date)
        )
      );

      // --- ADD ---
      for (const day of daysToAdd) {
        const cleanDay = {
          title: day.title,
          date: day.date,
          eventId: event.id,
        };
        await fetch(`http://localhost:8080/api/days`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanDay),
        });
      }

      // --- UPDATE ---
      for (const day of daysToUpdate) {
        const cleanDay = {
          id: day.id,
          title: day.title,
          date: day.date,
          eventId: event.id,
        };
        await fetch(`http://localhost:8080/api/days/${day.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanDay),
        });
      }

      // --- DELETE ---
      for (const day of daysToDelete) {
        await fetch(`http://localhost:8080/api/days/${day.id}`, {
          method: "DELETE",
        });
      }
    } catch (err) {}
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

  const deleteEvent = async (eventToDelete) => {
    try {
      await fetch(`http://localhost:8080/api/events/${eventToDelete.id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        createEvent,
        updateEvent,
        updateEventDays,
        fetchEvents,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export const useEvents = () => useContext(EventContext);
