import { createContext, useContext, useState } from "react";

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Trip to Lisbon",
      description: "Weekend trip",
      location: "Lisbon, Portugal",
      numDays: null,
      budgetLimit: 1200,
      days: [],
      imagePath: "/backgrounds/lisbon.jpg",
    },
    {
      id: 2,
      title: "Wedding Party",
      description: "Best friend's wedding",
      location: "Coimbra, Portugal",
      numDays: 0,
      budgetLimit: 3000,
      days: [],
      imagePath: "/backgrounds/wedding.jpg",
    },
  ]);

  const updateEvent = (id, updatedFields) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, ...updatedFields } : event
      )
    );
  };

  return (
    <EventContext.Provider value={{ events, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEvents = () => useContext(EventContext);
