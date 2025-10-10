import { Link, useParams } from "react-router-dom";
import DayCard from "./DayCard";
import { useEvents } from "../providers/EventProvider";

export default function DaysContainer({ days }) {
  const { eventId } = useParams();
  const { events, updateEvent } = useEvents();
  const event = events.find((e) => e.id === parseInt(eventId));
  if (!event) return <div className="text-center mt-8">Event not found</div>;

  const addDay = () => {
    const temporaryId = event.days.length + 1;
    const dayTitle = prompt("Enter title for the day: ", `Day ${temporaryId}`);
    const dayDate = prompt("Enter date for '" + dayTitle + "' (YYYY-MM-DD): ");
    const date = new Date(dayDate);
    if (isNaN(date)) {
      alert("Invalid date! Please use format YYYY-MM-DD.");
    } else {
      console.log("Valid date:", date);
    }

    if (!dayDate) return;
    const newDay = {
      id: temporaryId,
      title: dayTitle,
      date: dayDate,
      eventId: event.id,
    };
    days = [...days, newDay];
    event.days = days;
    updateEvent(event);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-4/5 lg:w-3/5">
          {days.map((day) => (
            <Link key={day.id} to={`/day/${day.id}`}>
              <DayCard day={day} />
            </Link>
          ))}

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
