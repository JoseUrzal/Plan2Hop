export default function SaveButton({ onClick }) {
  return (
    <div className="flex justify-center mb-8">
      <button
        onClick={onClick}
        className="text-indigo-300 font-medium px-4 py-1 rounded-lg hover:text-orange-400 transition-all duration-200 border border-indigo-400"
      >
        Save
      </button>
    </div>
  );
}
