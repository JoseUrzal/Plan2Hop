import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";

export default function DashboardPage() {
  const events = [
    {
      id: 1,
      title: "Trip to Lisbon",
      imagePath: "../public/backgrounds/lisbon.jpg",
    },
    {
      id: 2,
      title: "Wedding Party",
      imagePath: "../public/backgrounds/wedding.jpg",
    },
    {
      id: 3,
      title: "Family Weekend",
      imagePath: "../public/backgrounds/family.jpg",
    },
    {
      id: 4,
      title: "Padel Tournament",
      imagePath: "../public/backgrounds/padel.jpg",
    },
    {
      id: 5,
      title: "Birthday Dinner",
      imagePath: "../public/backgrounds/birthday.jpg",
    }, // no image yet
  ];

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 flex items-center space-x-4">
        {/* Image logo */}
        <img
          src="../public/backgrounds/myIcon.png" // path to your image in public folder
          alt="Plan2Hop Logo"
          className="h-12 w-12 object-cover rounded-full"
        />

        <span>Plan 2 Hop</span>
      </h1>

      {/* Accent line */}
      <span className="block h-1 w-24 bg-orange-500 rounded-full mb-8"></span>

      {/* Grid of event cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {events.map((event) => (
          <Link key={event.id} to={`/event/${event.id}`}>
            <EventCard event={event} />
          </Link>
        ))}
      </div>
    </div>
  );
}
