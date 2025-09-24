import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../providers/EventProvider";
import DayCard from "../components/DayCard";

export default function EventPage() {
  const { eventId } = useParams();
  const { events, updateEvent } = useEvents();

  const event = events.find((e) => e.id === parseInt(eventId));
  if (!event) return <div className="text-center mt-8">Event not found</div>;

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [numDays, setNumDays] = useState(event.numDays || 0);
  const [budgetLimit, setBudgetLimit] = useState(event.budgetLimit || 0);
  const [days, setDays] = useState(event.days || []);

  // 🔄 Keep days array in sync with numDays
  useEffect(() => {
    const updatedDays = Array.from({ length: numDays }, (_, i) => ({
      id: i + 1,
      title: days[i]?.title || `Day ${i + 1}`,
    }));
    setDays(updatedDays);
  }, [numDays]);

  // ➕ Add day manually
  const addDay = () => {
    const newDayNumber = days.length + 1;
    const dayTitle = prompt("Enter title for the day:", `Day ${newDayNumber}`);
    if (!dayTitle) return;
    const newDay = { id: newDayNumber, title: dayTitle };
    setDays([...days, newDay]);
    setNumDays(days.length + 1); // keep sync
  };

  // 💾 Save changes back to context
  useEffect(() => {
    updateEvent(event.id, {
      title,
      description,
      location,
      numDays,
      budgetLimit,
      days,
    });
  }, [title, description, location, numDays, budgetLimit, days]);

  return (
    <div className="space-y-8 px-4 md:px-0">
      {/* Top card */}
      <div className="flex justify-center mt-8">
        <div
          className="relative w-11/12 md:w-4/5 lg:w-3/5 h-96 rounded-xl shadow-lg overflow-hidden"
          style={{
            backgroundImage: `url('/backgrounds/lisbon.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/25"></div>

          <div className="relative z-10 flex flex-col justify-between h-full p-6">
            <div className="flex flex-col items-center space-y-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-white font-bold text-3xl text-center w-auto bg-transparent border-none focus:outline-none focus:ring-0"
                placeholder="Title"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="text-white text-sm text-center w-auto bg-transparent border-none focus:outline-none focus:ring-0"
                placeholder="Description"
              />
            </div>

            <div className="flex justify-center mt-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-white text-sm text-center w-auto bg-transparent border-none focus:outline-none focus:ring-0"
                placeholder="Location"
              />
            </div>

            <div className="flex justify-center gap-6 mt-4">
              <div className="flex flex-col items-center">
                <label className="text-white text-sm mb-1">
                  Number of days:
                </label>
                <input
                  type="number"
                  value={numDays}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty input while typing
                    if (value === "") {
                      setNumDays("");
                    } else {
                      setNumDays(parseInt(value));
                    }
                  }}
                  onBlur={() => {
                    // If empty, reset to 0
                    if (numDays === "") setNumDays(0);
                  }}
                  className="text-white text-center w-24 bg-transparent border-none focus:outline-none focus:ring-0"
                  placeholder="Days"
                />
              </div>
              <div className="flex flex-col items-center">
                <label className="text-white text-sm mb-1">
                  Budget limit (€):
                </label>
                <input
                  type="number"
                  value={budgetLimit}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setBudgetLimit(""); // allow empty input while typing
                    } else {
                      setBudgetLimit(parseFloat(value)); // parse as float for decimals
                    }
                  }}
                  onBlur={() => {
                    // If empty, reset to 0
                    if (budgetLimit === "") setBudgetLimit(0);
                  }}
                  className="text-white text-center w-32 bg-transparent border-none focus:outline-none focus:ring-0"
                  placeholder="Budget"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DayCards */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-4/5 lg:w-3/5">
          {days.map((day) => (
            <DayCard key={day.id} day={day} />
          ))}

          {/* ➕ '+' card */}
          <div
            onClick={addDay}
            className="flex items-center justify-center h-32 bg-gray-100 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-200 transition shadow-md"
          >
            <span className="text-4xl font-bold text-gray-400">+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
