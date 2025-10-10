import { Link, useParams } from "react-router-dom";
import { useEvents } from "../providers/EventProvider";
import Header from "../components/Header";
import EventDescription from "../components/EventDescription";
import DaysContainer from "../components/DaysContainer";

export default function EventPage() {
  const { eventId } = useParams();
  const { events, updateEvent } = useEvents();
  const event = events.find((e) => e.id === parseInt(eventId));
  if (!event) return <div className="text-center mt-8">Event not found</div>;

  // const [title, setTitle] = useState(event.title);
  // const [description, setDescription] = useState(event.description);
  // const [location, setLocation] = useState(event.location);
  // const [budgetLimit, setBudgetLimit] = useState(event.budgetLimit || 0);
  // const [days, setDays] = useState(event.days || []);
  // const [imagePath, setImagePath] = useState(
  //   event.imagePath || "/backgrounds/myIcon.png"
  // );

  // const [tempNumDays, setTempNumDays] = useState(days.length);
  // const [tempBudget, setTempBudget] = useState(budgetLimit);

  // const applyNumDaysChange = (val) => {
  //   let value = parseInt(val);
  //   if (isNaN(value)) value = 0;
  //   if (value > 39) value = 39;
  //   if (value < 0) value = 0;

  //   if (value > days.length) {
  //     const newDays = [...days];
  //     for (let i = days.length; i < value; i++) {
  //       newDays.push({ id: i + 1, title: `Day ${i + 1}` });
  //     }
  //     setDays(newDays);
  //   } else if (value < days.length) {
  //     setDays(days.slice(0, value));
  //   }

  //   setTempNumDays(value);
  // };

  // const applyBudgetChange = () => {
  //   let value = parseFloat(tempBudget);
  //   if (isNaN(value)) value = 0;
  //   if (value > 100000) value = 100000; // enforce max
  //   if (value < 0) value = 0; // enforce min

  //   setBudgetLimit(value);
  //   setTempBudget(value); // sync field back to cleaned number
  // };

  // useEffect(() => {
  //   const updatedDays = Array.from({ length: days.length }, (_, i) => ({
  //     id: i + 1,
  //     title: days[i]?.title || `Day ${i + 1}`,
  //   }));
  //   setDays(updatedDays);
  // }, [days.length]);

  // ➕ Add day manually

  // //💾 Save changes back to context
  // useEffect(() => {
  //   updateEvent({
  //     id: event.id,
  //     title,
  //     description,
  //     location,
  //     budgetLimit,
  //     days,
  //     imagePath,
  //   });
  // }, [title, description, location, budgetLimit, days, imagePath]);

  return (
    <div className="space-y-8 px-4 md:px-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 min-h-screen">
      <Header />
      <EventDescription />
      <DaysContainer days={event.days} />
      {/* <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-4/5 lg:w-3/5">
          {event.days.map((day) => (
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
      </div> */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => saveEvent()}
          className="text-indigo-300 font-medium px-4 py-1 rounded-lg hover:text-orange-400 transition-all duration-200 border border-indigo-400"
        >
          Save
        </button>
      </div>
    </div>
  );
}
