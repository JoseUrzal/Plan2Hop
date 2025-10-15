import { useEffect, useState } from "react";
import { useDays } from "../../providers/DaysProvider";

export default function EventDescription({ event, onUpdate }) {
  const { fetchDaysByEvent } = useDays();
  const [title, setTitle] = useState(event.title);
  const [location, setLocation] = useState(event.location);
  const [budget, setBudget] = useState(event.budgetLimit || 0);
  const [saving, setSaving] = useState(false);

  // keep local state in sync if parent changes
  useEffect(() => {
    setTitle(event.title);
    setLocation(event.location);
    setBudget(event.budgetLimit || 0);
  }, [event]);

  useEffect(() => {
    fetchDaysByEvent(event.id);
  }, [event.id]);

  const handleBlur = async () => {
    if (
      title !== event.title ||
      location !== event.location ||
      Number(budget) !== event.budgetLimit
    ) {
      setSaving(true);
      await onUpdate({
        ...event,
        title,
        location,
        budgetLimit: Number(budget),
      });
      setSaving(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.target.blur(); // save on Enter
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center transition space-y-4 w-full">
        {/* ✅ Event title */}
        <div className="w-full flex items-center relative">
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
            onBlur={handleBlur}
            className="text-indigo-200 font-bold text-3xl text-center w-full bg-transparent border-none focus:outline-none focus:ring-0"
          />
        </div>

        {/* ✅ Location */}
        <div className="flex items-center gap-1">
          <span className="text-base">📌</span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onBlur={handleBlur}
            size={Math.max(location.length, 1)}
            className="text-gray-500 text-center text-xl w-auto bg-transparent border-none focus:outline-none focus:ring-0"
            placeholder="- location -"
          />
          <span className="text-base">🌍</span>
        </div>

        {/* ✅ Budget setter */}
        <div className="flex items-center">
          <div className="flex items-center py-0.5rounded-md transition">
            <span className="pr-3">💰</span>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-24 bg-transparent text-center focus:outline-none"
            />
            <span>💰</span>
          </div>
        </div>

        {/* 💾 Saving feedback */}
        {saving && (
          <p className="text-xs text-gray-400 mt-1 animate-pulse">Saving...</p>
        )}
      </div>
    </div>
  );
}
