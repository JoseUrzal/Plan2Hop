import { Link, useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import { useEvents } from "../providers/EventProvider";

export default function DashboardPage() {
  const { events, addEvent } = useEvents();
  const navigate = useNavigate();

  const handleAddEvent = () => {
    const newEvent = addEvent();
    navigate(`/event/${newEvent.id}`);
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 flex items-center justify-center space-x-4">
        {/* Small logo on the left */}
        <img
          src="/backgrounds/myIcon.png" // replace with your logo path in public folder
          alt="Plan2Hop Logo"
          className="h-12 w-12 object-cover rounded-full"
        />

        <span>Plan 2 Hop</span>
      </h1>

      {/* Accent line below */}
      <span className="block h-1 w-24 bg-orange-500 rounded-full mb-8 mx-auto"></span>

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
