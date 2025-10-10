import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDays } from "../providers/DaysProvider";
import DayCard from "./DayCard";

export default function DaysContainer({ eventId }) {
  const { days, fetchDaysByEvent, addDay } = useDays();

  useEffect(() => {
    fetchDaysByEvent(eventId);
  }, [eventId]);

  const handleAddDay = async () => {
    const title = prompt("Enter day title:");
    const date = prompt("Enter date (YYYY-MM-DD):");
    if (!title || !date) return;

    await addDay({ title, date, eventId });
  };

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-4/5 lg:w-3/5">
        {days.map((day) => (
          <Link key={day.id} to={`/day/${day.id}`}>
            <DayCard day={day} />
          </Link>
        ))}

        <div
          onClick={handleAddDay}
          className="flex items-center justify-center h-32 bg-gray-100 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-200 transition shadow-md"
        >
          <span className="text-4xl font-bold text-gray-400">+</span>
        </div>
      </div>
    </div>
  );
}
