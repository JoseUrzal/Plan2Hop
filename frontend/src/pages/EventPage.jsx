import { useState } from "react";
import DayCard from "../components/DayCard";

export default function EventPage() {
  const [title, setTitle] = useState("Trip to Lisbon");
  const [description, setDescription] = useState("A fun weekend trip.");
  const [location, setLocation] = useState("Lisbon, Portugal");
  const [numDays, setNumDays] = useState(0);
  const [budgetLimit, setBudgetLimit] = useState(1200);

  const [days, setDays] = useState([]);

  const addDay = () => {
    const newDayNumber = days.length + 1;
    const dayTitle = prompt("Enter title for the day:", `Day ${newDayNumber}`);
    if (!dayTitle) return;
    setDays([...days, { id: newDayNumber, title: dayTitle }]);
    setNumDays(days.length + 1);
  };

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
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/25"></div>

          {/* Editable content */}
          <div className="relative z-10 flex flex-col justify-between h-full p-6">
            {/* Top fields */}
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

            {/* Location above bottom fields */}
            <div className="flex justify-center mt-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-white text-sm text-center w-auto bg-transparent border-none focus:outline-none focus:ring-0"
                placeholder="Location"
              />
            </div>

            {/* Bottom fields with labels */}
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex flex-col items-center">
                <label className="text-white text-sm mb-1">
                  Number of days:
                </label>
                <input
                  type="number"
                  value={numDays}
                  onChange={(e) => setNumDays(e.target.value)}
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
                  onChange={(e) => setBudgetLimit(e.target.value)}
                  className="text-white text-center w-32 bg-transparent border-none focus:outline-none focus:ring-0"
                  placeholder="Budget (€)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DayCards section */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-4/5 lg:w-3/5">
          {days.map((day) => (
            <DayCard key={day.id} day={day} />
          ))}

          {/* '+' card */}
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
