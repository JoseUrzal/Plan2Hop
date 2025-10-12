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
    const title = prompt("Enter activity title: ");
    if (!title) return alert("Title is required!");
    const location = prompt("Enter activity location: ");
    const cost = prompt("Enter activity cost: ");

    const newActivity = {
      id: Date.now(), // temporary id until saved in DB
      title,
      description: "",
      cost: "",
      dayId,
    };
    // Update local state immutably
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
