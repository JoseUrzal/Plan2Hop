import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../providers/EventsProvider";
import { useDays } from "../providers/DaysProvider";
import Header from "../components/Header";
import EventDescription from "../components/descriptions/EventDescription";
import DaysContainer from "../components/containers/DaysContainer";
import SaveButton from "../components/SaveButton";

export default function EventPage() {
  const { eventId } = useParams();
  const { events, updateEvent } = useEvents();
  const { days, addDay } = useDays();
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    const e = events.find((ev) => ev.id === parseInt(eventId));
    setCurrentEvent(e);
  }, [events, eventId]);

  if (!currentEvent)
    return <div className="text-center mt-8">Event not found</div>;

  return (
    <div className="space-y-8 px-4 md:px-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 min-h-screen">
      <Header />
      <EventDescription />
      <DaysContainer eventId={currentEvent.id} />
      <SaveButton onClick={() => updateEvent({ ...currentEvent, days })} />
    </div>
  );
}
