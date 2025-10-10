import { useEvents } from "../providers/EventsProvider";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function EventDescription() {
  const { events, updateEvent } = useEvents();

  const { eventId } = useParams();
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

  const applyBudgetChange = () => {
    let value = parseFloat(tempBudget);
    if (isNaN(value)) value = 0;
    if (value > 100000) value = 100000; // enforce max
    if (value < 0) value = 0; // enforce min

    setBudgetLimit(value);
    setTempBudget(value); // sync field back to cleaned number
  };

  const applyNumDaysChange = (val) => {
    let value = parseInt(val);
    if (isNaN(value)) value = 0;
    if (value > 39) value = 39;
    if (value < 0) value = 0;

    if (value > days.length) {
      const newDays = [...days];
      for (let i = days.length; i < value; i++) {
        newDays.push({ id: i + 1, title: `Day ${i + 1}` });
      }
      setDays(newDays);
    } else if (value < days.length) {
      setDays(days.slice(0, value));
    }

    setTempNumDays(value);
  };

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-4/5 lg:w-3/5">
        {/* LEFT: Image */}
        <div
          className="relative h-32 bg-white shadow-lg rounded-xl flex justify-center items-center overflow-hidden hover:shadow-2xl transition"
          style={{
            backgroundImage: event.imagePath
              ? `url('${event.imagePath}')`
              : `url('/backgrounds/myIcon.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/25 rounded-xl"></div>
        </div>

        {/* MIDDLE: Title & Location */}
        <div className="flex flex-col justify-center items-center h-32 transition p-4 space-y-2 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-gray-500 font-bold text-2xl text-center w-full bg-transparent border-none focus:outline-none focus:ring-0"
            placeholder="Title"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-gray-500 text-center w-full bg-transparent border-none focus:outline-none focus:ring-0"
            placeholder="Location"
          />
        </div>

        {/* RIGHT: Description + Days + Budget */}
        <div className="flex flex-col justify-between h-32 p-4 w-full">
          {/* Description textarea */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-gray-500 w-full h-12 flex-grow bg-transparent border-none focus:outline-none focus:ring-0 p-2 resize-none overflow-hidden text-center"
            placeholder="Description"
          ></textarea>

          {/* Days & Budget under Description */}
          <div className="flex justify-center items-center gap-4 w-full mt-2">
            {/* Days */}
            <div className="flex flex-col items-center w-20">
              <label className="text-gray-400 text-1l text-center mb-1 w-full font-bold">
                DAYS
              </label>
              <input
                type="number"
                value={tempNumDays}
                onChange={(e) => {
                  setTempNumDays(parseInt(e.target.value));
                  applyNumDaysChange(e.target.value); // immediate update
                }}
                className="text-gray-700 text-center w-full h-8ed focus:outline-none focus:ring-1 focus:ring-indigo-300"
              />
            </div>

            {/* Budget */}
            <div className="flex flex-col items-center">
              <label className="text-gray-400 mb-1 text-1l text-center font-bold">
                BUDGET
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={tempBudget}
                  onChange={(e) => setTempBudget(e.target.value)}
                  onBlur={applyBudgetChange}
                  onKeyDown={(e) => e.key === "Enter" && applyBudgetChange()}
                  className="text-gray-500 text-center w-16 bg-transparent border-none focus:outline-none focus:ring-0"
                />
                <span className="text-gray-500 ml-1">€</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
