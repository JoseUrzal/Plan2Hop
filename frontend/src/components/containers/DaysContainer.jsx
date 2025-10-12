import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDays } from "../../providers/DaysProvider";
import DayCard from "../cards/DayCard";

export default function DaysContainer({ eventId }) {
  const navigate = useNavigate();

  const { days, fetchDaysByEvent, addDay, updateDay, deleteDay } = useDays();

  const addDayCard = {
    id: Date.now(),
    title: "+",
    date: "",
    eventId,
  };

  const handleAddDay = () => {
    const suggestedTitle = `Day ${days.length + 1}`;
    const title = prompt("Enter day title: ", suggestedTitle);
    if (!title) return alert("Title is required!");

    let suggestedDate;
    if (days.length > 0) {
      const lastDate = new Date(days[days.length - 1].date);
      lastDate.setDate(lastDate.getDate() + 1); // next day
      suggestedDate = lastDate.toISOString().split("T")[0]; // format YYYY-MM-DD
    } else {
      suggestedDate = new Date().toISOString().split("T")[0];
    }
    let date;
    while (true) {
      const input = prompt("Enter date (YYYY-MM-DD):", suggestedDate);
      if (!input) return; // user canceled

      // Validate the format using a regex
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(input)) {
        alert("Invalid date format! Please use YYYY-MM-DD.");
        continue;
      }
      // Validate if it's a real date
      const parsedDate = new Date(input);
      if (isNaN(parsedDate.getTime())) {
        alert("Invalid date! Please enter a real date in YYYY-MM-DD.");
        continue;
      }
      date = input;
      break;
    }

    const newDay = {
      id: Date.now(), // temporary id until saved in DB
      title,
      date,
      eventId,
    };

    // Update local state immutably
    addDay(newDay);
  };

  const handleDeleteDay = (id) => {
    if (window.confirm("Are you sure you want to delete this day?")) {
      deleteDay(id);
    }
  };

  useEffect(() => {
    fetchDaysByEvent(eventId);
  }, [eventId]);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-4/5 lg:w-3/5">
        {days.map((day) => (
          <DayCard
            key={day.id}
            day={day}
            onDelete={handleDeleteDay}
            onOpen={() => navigate(`/day/${day.id}`)}
          />
        ))}
        <div onClick={handleAddDay}>
          <DayCard day={addDayCard} />
        </div>
      </div>
    </div>
  );
}
