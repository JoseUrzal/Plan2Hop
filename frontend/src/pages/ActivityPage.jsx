import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ActivityDescription from "../components/descriptions/ActivityDescription";
import { useDays } from "../providers/DaysProvider";
import { useActivities } from "../providers/ActivitiesProvider";

export default function DayPage() {
  const [currentActivity, setCurrentActivity] = useState(null);
  const { activities, fetchActivitiesByDay } = useActivities();
  const { dayId } = useParams();

  return (
    <div className="space-y-8 px-4 md:px-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 min-h-screen">
      <Header />
      <ActivityDescription />

      {/* <SaveButton onClick={() => updateDay({ ...currentDay, activities })} /> */}
    </div>
  );
}
