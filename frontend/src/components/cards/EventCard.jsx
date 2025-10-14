export default function EventCard({ event, onDelete, onOpen }) {
  const isAddCard = event.title === "+";

  return (
    <div
      onClick={onOpen}
      className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 shadow-lg rounded-xl p-4 flex flex-col justify-center items-center h-32 hover:shadow-2xl transition cursor-pointer group overflow-hidden"
      style={{
        backgroundImage: event.imagePath
          ? `url(${event.imagePath})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay to darken the image */}
      {event.imagePath && (
        <div className="absolute inset-0 bg-black/40 rounded-xl z-0"></div>
      )}

      {/* Delete button */}
      {!isAddCard && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(event.id);
          }}
          className="absolute top-3 right-6 z-10 text-orange-500 hover:text-red-600 text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ❌
        </button>
      )}

      {/* Text */}
      <div className="w-full text-center p-4 z-10">
        <h2 className="text-white text-2xl font-bold drop-shadow-md">
          {event.title}
        </h2>
      </div>
    </div>
  );
}
