import { useEvents } from "../../providers/EventsProvider";
import { useDays } from "../../providers/DaysProvider";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EventDescription() {
  const { eventId } = useParams();
  const { events } = useEvents();
  const { fetchDaysByEvent } = useDays();
  const event = events.find((e) => e.id === parseInt(eventId));
  if (!event) return <div className="text-center mt-8">Event not found</div>;

  useEffect(() => {
    fetchDaysByEvent(eventId);
  }, [eventId]);

  const [title, setTitle] = useState(event.title);
  const [location, setLocation] = useState(event.location);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center transition space-y-4 w-full">
        <div className="w-full flex items-center">
          <label
            className={`absolute left-1/2 transform -translate-x-1/2 text-gray-400 pointer-events-none transition-all duration-200 ${
              title ? "opacity-0" : "opacity-60"
            }`}
          >
            - name your event -
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-indigo-200 font-bold text-3xl text-center w-full bg-transparent border-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex items-center">
          <span className="text-base">📍</span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            size={Math.max(location.length, 1)}
            className="text-gray-500 text-center text-xl w-auto bg-transparent border-none focus:outline-none focus:ring-0"
            placeholder="- location -"
          />
        </div>
      </div>
    </div>
  );
}
