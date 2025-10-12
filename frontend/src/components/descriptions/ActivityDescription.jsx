import { useState, useEffect } from "react";
import { useDays } from "../../providers/DaysProvider";
import { useActivities } from "../../providers/ActivitiesProvider";
import { useParams } from "react-router-dom";

export default function ActivityDescription() {
  const { activityId } = useParams();
  const { activities } = useActivities();
  const activity = activities.find((a) => a.id === parseInt(activityId));
  if (!activity)
    return <div className="text-center mt-8">Activity not found</div>;

  const [title, setTitle] = useState(activity.title);
  const [description, setDescription] = useState(activity.description);
  const [cost, setCost] = useState(activity.cost);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center transition space-y-4 w-full">
        <div className="w-full flex items-center">
          <label
            className={`absolute left-1/2 transform -translate-x-1/2 text-gray-400 pointer-events-none transition-all duration-200 ${
              title ? "opacity-0" : "opacity-60"
            }`}
          >
            - name your activity -
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-indigo-200 font-bold text-3xl text-center w-full bg-transparent border-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={description}
            onChange={(e) => setDate(e.target.value)}
            className="text-gray-500 text-center text-xl w-auto bg-transparent border-none focus:outline-none focus:ring-0"
            placeholder="- description -"
          />
        </div>
      </div>
    </div>
  );
}
