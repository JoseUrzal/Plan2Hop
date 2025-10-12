export default function EventCard({ event }) {
  return (
    <div
      className={`relative h-48 w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition hover:scale-105 flex items-end`}
      style={{
        backgroundImage: event.imagePath
          ? `url(${event.imagePath})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: event.imagePath ? undefined : "#e2e8f0",
      }}
    >
      <div className="w-full bg-gradient-to-t from-black/50 to-transparent p-4">
        <h2 className="text-white text-lg font-bold">{event.title}</h2>
      </div>
    </div>
  );
}
