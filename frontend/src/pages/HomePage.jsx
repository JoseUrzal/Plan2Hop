import { Link, useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import { useEvents } from "../providers/EventProvider";
import Header from "../components/Header";

export default function DashboardPage() {
  const { events, createEvent } = useEvents();
  const navigate = useNavigate();

  const handleAddEvent = async () => {
    const newEvent = await createEvent();
    navigate(`/event/${newEvent.id}`);
  };

  return (
    <div className="p-8 flex flex-col items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 min-h-screen">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {events.map((event) => (
          <Link key={event.id} to={`/event/${event.id}`}>
            <EventCard event={event} />
          </Link>
        ))}

        {/* "+" card */}
        <div
          onClick={handleAddEvent}
          className="flex items-center justify-center h-48 w-full bg-gray-100 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-200 transition shadow-md md:w-auto"
        >
          <span className="text-4xl font-bold text-gray-400">+</span>
        </div>
      </div>
    </div>
  );
}
