import { useState, useEffect } from "react";
import { useDays } from "../../providers/DaysProvider";
import { useActivities } from "../../providers/ActivitiesProvider";
import { useParams } from "react-router-dom";

export default function DayDescription() {
  const { dayId } = useParams();
  const { days } = useDays();
  const { fetchActivitiesByDay } = useActivities();
  const day = days.find((d) => d.id === parseInt(dayId));
  if (!day) return <div className="text-center mt-8">Day not found</div>;

  useEffect(() => {
    fetchActivitiesByDay(dayId);
  }, [dayId]);

  const [title, setTitle] = useState(day.title);
  const [date, setDate] = useState(day.date);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center transition space-y-4 w-full">
        <div className="w-full flex items-center">
          <label
            className={`absolute left-1/2 transform -translate-x-1/2 text-gray-400 pointer-events-none transition-all duration-200 ${
              title ? "opacity-0" : "opacity-60"
            }`}
          >
            - name your day -
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-indigo-200 font-bold text-3xl text-center w-full bg-transparent border-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="text-gray-500 text-center text-xl w-auto bg-transparent border-none focus:outline-none focus:ring-0"
            placeholder="- date -"
          />
        </div>
      </div>
    </div>
  );
}
