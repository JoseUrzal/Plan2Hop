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

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr; // fallback if invalid
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const [title, setTitle] = useState(day.title);
  const [date, setDate] = useState(formatDate(day.date));
  const [isEditingDate, setIsEditingDate] = useState(false);

  useEffect(() => {
    fetchActivitiesByDay(dayId);
  }, [dayId]);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center transition space-y-4 w-full">
        {/* Title */}
        <div className="w-full flex items-center relative">
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

        {/* Date (click to edit) */}
        <div className="flex items-center text-gray-400 text-xl">
          <span className="mr-1">🗓️</span>
          {!isEditingDate ? (
            <span
              className="cursor-pointer hover:text-gray-200 transition"
              onClick={() => setIsEditingDate(true)}
            >
              {date || "- date -"}
            </span>
          ) : (
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(formatDate(e.target.value))}
              onBlur={() => setIsEditingDate(false)}
              className="text-gray-400 bg-transparent border-none focus:outline-none text-center"
              autoFocus
            />
          )}
        </div>
      </div>
    </div>
  );
}
