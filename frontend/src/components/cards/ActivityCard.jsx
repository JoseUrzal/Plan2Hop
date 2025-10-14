export default function ActivityCard({ activity, onDelete, onOpen }) {
  const isAddCard = activity.title === "+"; // detect the special "Add" card
  return (
    <div
      onClick={onOpen}
      className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 shadow-lg hover:shadow-orange-700/30 rounded-xl p-4 flex flex-col justify-center space-y-2 items-center h-32 hover:shadow-2xl transition cursor-pointer group"
    >
      {/* Delete button */}
      {!isAddCard && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering card click
            onDelete(activity.id);
          }}
          className="absolute top-3 right-6 text-orange-500 hover:text-red-600 text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity "
        >
          ❌
        </button>
      )}
      <h2
        className={`font-bold text-indigo-200 ${
          isAddCard ? "group-hover:text-orange-500 text-2xl" : ""
        }`}
      >
        {activity.title}
      </h2>
      {/* Only show location and cost if NOT Add card */}
      {!isAddCard && (
        <>
          <h5 className="text-gray-400">📌 {activity.location}</h5>
          <h5 className="text-gray-400">💰 {activity.cost}</h5>
        </>
      )}
    </div>
  );
}
