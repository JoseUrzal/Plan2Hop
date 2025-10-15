export default function SaveCard({ onClick }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className="mb-10 text-indigo-200 font-xl px-4 py-1 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 shadow-lg hover:shadow-orange-700/30 rounded-xl"
      >
        Save 💾
      </button>
    </div>
  );
}
