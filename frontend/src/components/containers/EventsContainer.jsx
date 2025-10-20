import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../providers/EventsProvider";
import EventCard from "../cards/EventCard";

export default function EventsContainer() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const { events, fetchEvents, addEvent, updateEvent, deleteEvent } =
    useEvents();

  const addEventCard = {
    id: Date.now(),
    title: "+",
    date: "",
  };

  const handleAddEvent = () => {
    const suggestedTitle = `Day ${days.length + 1}`;
    const title = prompt("Enter day title: ", suggestedTitle);
    if (!title) return alert("Title is required!");

    let suggestedDate;
    if (days.length > 0) {
      const lastDate = new Date(days[days.length - 1].date);
      lastDate.setDate(lastDate.getDate() + 1); // next day
      suggestedDate = lastDate.toISOString().split("T")[0]; // format YYYY-MM-DD
    } else {
      suggestedDate = new Date().toISOString().split("T")[0];
    }
    let date;
    while (true) {
      const input = prompt("Enter date (YYYY-MM-DD):", suggestedDate);
      if (!input) return; // user canceled

      // Validate the format using a regex
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(input)) {
        alert("Invalid date format! Please use YYYY-MM-DD.");
        continue;
      }
      // Validate if it's a real date
      const parsedDate = new Date(input);
      if (isNaN(parsedDate.getTime())) {
        alert("Invalid date! Please enter a real date in YYYY-MM-DD.");
        continue;
      }
      date = input;
      break;
    }

    const newEvent = {
      id: Date.now(), // temporary id until saved in DB
      title,
      date,
    };

    // Update local state immutably
    addEvent(newEvent);
  };

  const handleDeleteEvent = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      for (const event of events) {
        if ((event.id = eventId)) {
          deleteEvent(id);
        }
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-4/5 lg:w-3/5">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onDelete={handleDeleteEvent}
            onOpen={() => navigate(`/event/${event.id}`)}
          />
        ))}
        <div onClick={handleAddEvent}>
          <EventCard event={addEventCard} />
        </div>
      </div>
    </div>
  );
}
