import { useEffect } from "react";
import { useActivities } from "../../providers/ActivitiesProvider";
import ActivityCard from "../cards/ActivityCard";
import { useNavigate } from "react-router-dom";

export default function ActivitiesContainer({ dayId }) {
  const { activities, addActivity, fetchActivitiesByDay, deleteActivity } =
    useActivities();
  const navigate = useNavigate();

  const addActivityCard = {
    id: Date.now(),
    title: "+",
    description: "",
    cost: "",
    dayId,
  };

  const handleAddActivity = () => {
    const title = prompt("Enter activity title:");
    if (!title?.trim()) {
      alert("Title is required!");
      return;
    }

    const location = prompt("Enter activity location:") || "";

    const description = prompt("Enter activity description:") || "";

    let costInput;
    while (true) {
      const input = prompt("Enter activity cost (numbers only):");
      if (input === null) return; // user cancelled
      costInput = input;
      if (costInput.trim() === "") {
        alert("Cost is required!");
        continue;
      }

      // Validate cost
      const cost = Number(costInput);

      if (!Number.isFinite(cost) || !Number.isInteger(cost) || cost < 0) {
        alert(
          "Please enter a valid whole number for cost (no decimals or letters)."
        );
        continue;
      }
      costInput = input;
      break;
    }

    const newActivity = {
      id: Date.now(), // temporary id until saved in DB
      title: title.trim(),
      location: location.trim(),
      cost: Number(costInput), // store as number (Long-compatible)
      description: description.trim(),
      dayId: dayId,
    };

    addActivity(newActivity);
  };

  const handleDeleteActivity = (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      deleteActivity(id);
    }
  };

  useEffect(() => {
    fetchActivitiesByDay(dayId);
  }, [dayId]);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-4/5 lg:w-3/5">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onDelete={handleDeleteActivity}
            onOpen={() => navigate(`/activity/${activity.id}`)}
          />
        ))}
        <div onClick={handleAddActivity}>
          <ActivityCard activity={addActivityCard} />
        </div>
      </div>
    </div>
  );
}
