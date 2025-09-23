export default function DayCard({ day }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-center items-center h-32 hover:shadow-2xl transition cursor-pointer">
      <h3 className="font-bold text-lg">{day.title}</h3>
      <p className="text-gray-500 text-sm">Click to view details</p>
    </div>
  );
}
