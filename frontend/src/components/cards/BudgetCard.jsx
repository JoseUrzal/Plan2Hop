import { useState, useEffect } from "react";

export default function BudgetCard({ event, spent = 0, onUpdate }) {
  const [budget, setBudget] = useState(event?.budgetLimit || 0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setBudget(event?.budgetLimit || 0);
  }, [event]);

  const handleSave = async () => {
    if (!event || budget === event.budgetLimit) return;
    setSaving(true);
    await onUpdate({ ...event, budgetLimit: Number(budget) });
    setSaving(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.target.blur();
  };

  const percentage = budget > 0 ? (spent / budget) * 100 : 0;
  const isOverBudget = spent > budget;
  const displayPercentage = Math.min(percentage, 100);

  return (
    <div className="flex justify-center flex-col items-center space-y-1">
      {/* ⚠️ Warning */}
      {isOverBudget && (
        <div className="text-orange-400 font-semibold animate-pulse">
          ⚠️ Over budget by €{(spent - budget).toFixed(2)}
        </div>
      )}
      <div className="relative w-full md:w-4/5 lg:w-3/5 h-4 rounded-xl shadow-lg overflow-hidden transition-all duration-700 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700">
        {/* Filled portion */}
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-700 ${
            isOverBudget
              ? "bg-orange-600/70 animate-pulse"
              : percentage < 70
              ? "bg-gradient-to-r from-orange-900 to-orange-700"
              : percentage < 90
              ? "bg-gradient-to-r from-orange-900 to-orange-500"
              : "bg-gradient-to-r from-orange-900 to-orange-300"
          }`}
          style={{ width: `${displayPercentage}%` }}
        ></div>

        {/* Budget limit marker */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-orange-300"
          style={{
            left: `${Math.min(100, budget > 0 ? (budget / budget) * 100 : 0)}%`,
          }}
        ></div>

        {/* Text overlay */}
        <div className="absolute inset-0 flex justify-end items-center px-4 text-xs font-semibold text-indigo-100 mix-blend-difference">
          <span>
            €{spent.toFixed(2)} / €{budget}
          </span>
        </div>
      </div>

      {/* Saving feedback */}
      {saving && (
        <p className="text-xs text-gray-400 mt-1 animate-pulse">Saving...</p>
      )}
    </div>
  );
}
