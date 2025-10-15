import Header from "../components/Header";

export default function AboutPage() {
  return (
    <div className="space-y-8 px-4 md:px-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-indigo-200 text-center">
          About My Events
        </h1>

        {/* Current Features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-orange-400">
            Current Features
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Create and manage events</li>
            <li>Add and manage days per event</li>
            <li>Add activities and costs for each day</li>
            <li>Dynamic budget tracker with over-budget warning</li>
            <li>Edit event title, location, and budget</li>
            <li>User authentication with login page</li>
          </ul>
        </section>

        {/* Planned Features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-orange-400">
            Planned Features
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Invite participants to events</li>
            <li>Event image uploads and gallery</li>
            <li>Recurring events</li>
            <li>Notifications and reminders for upcoming activities</li>
            <li>Export event itinerary to PDF</li>
            <li>Dark/Light theme toggle</li>
          </ul>
        </section>

        {/* Cool & Future-Proof Features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-orange-400">
            Cool Features & Ideas
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Real-time collaboration on events</li>
            <li>Drag-and-drop activity scheduling</li>
            <li>Interactive budget visualization</li>
            <li>Map integration to see event locations</li>
            <li>AI suggestions for activity planning</li>
          </ul>
        </section>

        <p className="text-center text-gray-400 mt-8">
          We’re constantly improving My Events. Have suggestions? Reach out on
          the{" "}
          <a
            href="/contact"
            className="text-indigo-400 hover:text-orange-400 font-semibold"
          >
            Contact
          </a>{" "}
          page!
        </p>
      </div>
    </div>
  );
}
