export default function BudgetBar({ budget, totalCost }) {
  const [tempBudget, setTempBudget] = useState(budgetLimit);
  const [budgetLimit, setBudgetLimit] = useState(event.budgetLimit || 0);

  const applyBudgetChange = () => {
    let value = parseFloat(tempBudget);
    if (isNaN(value)) value = 0;
    if (value > 100000) value = 100000; // enforce max
    if (value < 0) value = 0; // enforce min

    setBudgetLimit(value);
    setTempBudget(value); // sync field back to cleaned number
  };

  const percentage = budget ? Math.min((totalCost / budget) * 100, 100) : 0;
  const progressColor =
    percentage < 75
      ? "bg-green-500"
      : percentage < 100
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="flex flex-col items-center">
      <label className="text-gray-400 mb-1 text-1l text-center font-bold">
        BUDGET
      </label>
      <div className="flex items-center">
        <input
          type="number"
          value={tempBudget}
          onChange={(e) => setTempBudget(e.target.value)}
          onBlur={applyBudgetChange}
          onKeyDown={(e) => e.key === "Enter" && applyBudgetChange()}
          className="text-gray-500 text-center w-16 bg-transparent border-none focus:outline-none focus:ring-0"
        />
        <span className="text-gray-500 ml-1">€</span>
      </div>
    </div>
  );
}
