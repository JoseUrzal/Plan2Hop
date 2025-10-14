import { Link, useNavigate } from "react-router-dom";
import EventCard from "../components/cards/EventCard";
import { useEvents } from "../providers/EventsProvider";
import Header from "../components/Header";
import EventsContainer from "../components/containers/EventsContainer";
import SaveButton from "../components/SaveButton";

export default function HomePage() {
  const { events, createEvent, updateEvents } = useEvents();
  const navigate = useNavigate();

  const handleAddEvent = async () => {
    const newEvent = await createEvent();
    navigate(`/event/${newEvent.id}`);
  };

  return (
    <div className="space-y-8 px-4 md:px-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 min-h-screen">
      <Header />
      <EventsContainer />
      <SaveButton onClick={() => updateEvent({ ...currentEvent, days })} />
    </div>
  );
}
