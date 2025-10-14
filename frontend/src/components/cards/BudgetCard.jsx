export default function BudgetCard({ budget = 0, spent = 0 }) {
  const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;

  return (
    <div className="flex justify-center">
      <div className="relative w-full md:w-4/5 lg:w-3/5 h-12 rounded-xl shadow-lg shadow-orange-700/30 overflow-hidden relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700">
        {/* ✅ Background fill */}
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-700 ${
            percentage < 70
              ? "bg-gradient-to-r from-green-500 to-green-600"
              : percentage < 90
              ? "bg-gradient-to-r from-orange-500 to-orange-600"
              : "bg-gradient-to-r from-red-500 to-red-600"
          }`}
          style={{ width: `${percentage}%` }}
        ></div>

        {/* ✅ Content overlay */}
        <div className="absolute inset-0 flex justify-between items-center px-4 text-sm font-semibold text-indigo-200 mix-blend-difference">
          <h2>Budget</h2>
          <span>
            €{spent.toFixed(2)} / €{budget.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
