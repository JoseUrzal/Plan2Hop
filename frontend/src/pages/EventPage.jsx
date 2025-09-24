import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
  const [budgetLimit, setBudgetLimit] = useState(event.budgetLimit || 0);
  const [days, setDays] = useState(event.days || []);
  const [imagePath, setImagePath] = useState(
    event.imagePath || "/backgrounds/myIcon.png"
  );

  const [tempNumDays, setTempNumDays] = useState(days.length);
  const [tempBudget, setTempBudget] = useState(budgetLimit);

  const applyNumDaysChange = () => {
    let value = parseInt(tempNumDays);
    if (isNaN(value)) value = 0;
    if (value > 39) value = 39;
    if (value < 0) value = 0;

    if (value > days.length) {
      // add missing days
      const newDays = [...days];
      for (let i = days.length; i < value; i++) {
        newDays.push({ id: i + 1, title: `Day ${i + 1}` });
      }
      setDays(newDays);
    } else if (value < days.length) {
      // trim extra days
      setDays(days.slice(0, value));
    }

    setTempNumDays(value); // sync back with actual length
  };

  const applyBudgetChange = () => {
    let value = parseFloat(tempBudget);
    if (isNaN(value)) value = 0;
    if (value > 100000) value = 100000; // enforce max
    if (value < 0) value = 0; // enforce min

    setBudgetLimit(value);
    setTempBudget(value); // sync field back to cleaned number
  };

  useEffect(() => {
    const updatedDays = Array.from({ length: days.length }, (_, i) => ({
      id: i + 1,
      title: days[i]?.title || `Day ${i + 1}`,
    }));
    setDays(updatedDays);
  }, [days.length]);

  // ➕ Add day manually
  const addDay = () => {
    const newDayNumber = days.length + 1;
    const dayTitle = prompt("Enter title for the day:", `Day ${newDayNumber}`);
    if (!dayTitle) return;
    const newDay = { id: newDayNumber, title: dayTitle };
    setDays([...days, newDay]);
  };

  // 💾 Save changes back to context
  useEffect(() => {
    updateEvent(event.id, {
      title,
      description,
      location,
      budgetLimit,
      days,
      imagePath,
    });
  }, [title, description, location, budgetLimit, days, imagePath]);

  return (
    <div className="space-y-8 px-4 md:px-0">
      {/* Top card */}
      <div className="flex justify-center mt-8">
        <div
          className="relative w-11/12 md:w-4/5 lg:w-3/5 h-96 rounded-xl shadow-lg overflow-hidden"
          style={{
            backgroundImage: event.imagePath
              ? `url('${event.imagePath}')`
              : `url('/backgrounds/myIcon.png')`,
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

            <div className="flex justify-center items-center gap-8 mt-4">
              {/* Days */}
              <div className="flex flex-col items-center">
                <label className="text-white text-sm mb-1">Days</label>
                <input
                  type="number"
                  value={tempNumDays}
                  onChange={(e) => {
                    setTempNumDays(e.target.value); // allow typing
                  }}
                  onBlur={applyNumDaysChange} // <-- reuse same function
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      applyNumDaysChange(); // trigger update on Enter
                    }
                  }}
                  className="text-white text-center w-auto bg-transparent border-none focus:outline-none focus:ring-0"
                  placeholder="Days"
                />
              </div>

              {/* Budget */}
              <div className="flex flex-col items-center">
                <label className="text-white text-sm mb-1">Budget (€)</label>
                <input
                  type="number"
                  value={tempBudget}
                  onChange={(e) => setTempBudget(e.target.value)} // allow typing freely
                  onBlur={applyBudgetChange} // apply on blur
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      applyBudgetChange(); // also apply on Enter
                    }
                  }}
                  className="text-white text-center w-auto bg-transparent border-none focus:outline-none focus:ring-0"
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
            <Link key={day.id} to={`/day/${day.id}`}>
              <DayCard day={day} />
            </Link>
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
