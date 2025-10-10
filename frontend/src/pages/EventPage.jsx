import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../providers/EventsProvider";
import Header from "../components/Header";
import EventDescription from "../components/EventDescription";
import DaysContainer from "../components/DaysContainer";

export default function EventPage() {
  const { eventId } = useParams();
  const { events, updateEvent } = useEvents();

  const [currentEvent, setCurrentEvent] = useState(null);
  useEffect(() => {
    const e = events.find((ev) => ev.id === parseInt(eventId));
    setCurrentEvent(e);
  }, [events, eventId]);

  console.log("EventPage render, eventId:", eventId, "event:", currentEvent);

  if (!currentEvent)
    return <div className="text-center mt-8">Event not found</div>;

  return (
    <div className="space-y-8 px-4 md:px-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 min-h-screen">
      <Header />
      <EventDescription />
      <DaysContainer eventId={currentEvent.id} />

      <div className="flex justify-center mb-8">
        <button
          onClick={() => saveEvent()}
          className="text-indigo-300 font-medium px-4 py-1 rounded-lg hover:text-orange-400 transition-all duration-200 border border-indigo-400"
        >
          Save
        </button>
      </div>
    </div>
  );
}
