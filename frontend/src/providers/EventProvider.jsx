import { createContext, useContext, useState } from "react";

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Trip to Lisbon",
      description: "Weekend trip",
      location: "Lisbon, Portugal",
      budgetLimit: 1200,
      days: [
        {
          id: 1,
          title: "Day 1",
          activities: [
            { id: 1, title: "Flight to Lisbon" },
            { id: 2, title: "Lunch at TimeOut Market" },
          ],
        },
        {
          id: 2,
          title: "Day 2",
          activities: [{ id: 1, title: "Visit Belém Tower" }],
        },
      ],
      imagePath: "/backgrounds/lisbon.jpg",
    },
    {
      id: 2,
      title: "Wedding Party",
      description: "Best friend's wedding",
      location: "Coimbra, Portugal",
      budgetLimit: 3000,
      days: [
        {
          id: 1,
          title: "Day 1",
          activities: [
            { id: 1, title: "beer with friends" },
            { id: 2, title: "party" },
          ],
        },
      ],
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

  // ✅ Add new event
  const addEvent = () => {
    const newEvent = {
      id: events.length + 1,
      title: "New Event",
      description: "",
      location: "",
      budgetLimit: 0,
      days: [],
      imagePath: "/backgrounds/myIcon.png",
    };
    setEvents([...events, newEvent]);
    return newEvent; // important for navigation
  };

  return (
    <EventContext.Provider value={{ events, updateEvent, addEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEvents = () => useContext(EventContext);
