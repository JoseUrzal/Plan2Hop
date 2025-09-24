import { useState } from "react";

export default function DayPage() {
  const [dayBlocks, setDayBlocks] = useState([]);

  const addBlock = () => {
    const blockTitle = prompt(
      "Enter title for the block:",
      `Activity ${dayBlocks.length + 1}`
    );
    if (!blockTitle) return;
    setDayBlocks([
      ...dayBlocks,
      { id: dayBlocks.length + 1, title: blockTitle },
    ]);
  };

  const removeBlock = (id) => {
    setDayBlocks(dayBlocks.filter((block) => block.id !== id));
  };

  return (
    <div className="space-y-6 px-4 md:px-0 py-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
        Day Schedule
      </h1>

      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        {dayBlocks.map((block) => (
          <div
            key={block.id}
            className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 w-full"
          >
            <span className="font-medium">{block.title}</span>
            <button
              onClick={() => removeBlock(block.id)}
              className="text-red-500 font-bold hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}

        {/* "+" block to add new activity */}
        <div
          onClick={addBlock}
          className="flex justify-center items-center bg-gray-100 border-2 border-dashed rounded-lg cursor-pointer h-16 hover:bg-gray-200 transition"
        >
          <span className="text-3xl font-bold text-gray-400">+</span>
        </div>
      </div>
    </div>
  );
}
