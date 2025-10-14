import { useState } from "react";
import { useEvents } from "../providers/EventsProvider";
import Header from "../components/Header";
import DayDescription from "../components/descriptions/DayDescription";
import { useDays } from "../providers/DaysProvider";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ActivitiesContainer from "../components/containers/ActivitiesContainer";
import BudgetCard from "../components/cards/BudgetCard";
import { useActivities } from "../providers/ActivitiesProvider";
import SaveButton from "../components/SaveButton";

export default function DayPage() {
  const [currentActivities, setCurrentActivities] = useState([]);
  const [currentDay, setCurrentDay] = useState(null);
  const { days, fetchDayById, updateDay } = useDays();

  const { dayId } = useParams();

  const { activities, fetchActivitiesByDay } = useActivities();
  const dayActivities = activities.filter((a) => a.dayId === dayId);
  const spentBudget = dayActivities.reduce(
    (sum, act) => sum + (Number(act.cost) || 0),
    0
  );

  const { events } = useEvents();

  useEffect(() => {
    const existingDay = days.find((d) => d.id === parseInt(dayId));
    if (existingDay) {
      setCurrentDay(existingDay);
    } else {
      // fetch only this day if it's not in state
      fetchDayById(parseInt(dayId)).then((day) => setCurrentDay(day));
    }
    fetchActivitiesByDay(dayId);
  }, [days, dayId]);

  if (!currentDay) return <div className="text-center mt-8">Day not found</div>;

  const addActivity = () => {
    const activityTitle = prompt(
      "Enter title for the activity:",
      `Activity ${currentActivities.length + 1}`
    );
    if (!activityTitle) return;
    setCurrentActivities([
      ...currentActivities,
      { id: currentActivities.length + 1, title: activityTitle },
    ]);
  };

  const removeActivity = (id) => {
    setCurrentActivities(
      currentActivities.filter((activity) => activity.id !== id)
    );
  };

  return (
    <div className="space-y-8 px-4 md:px-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 min-h-screen">
      <Header />
      <DayDescription />
      <BudgetCard
        budget={events.find((e) => e.id === currentDay.eventId)?.budgetLimit}
        spent={spentBudget}
      />

      <ActivitiesContainer dayId={currentDay.id} />

      <SaveButton
        onClick={() =>
          updateDay({ ...currentDay, activities: currentActivities })
        }
      />
    </div>
  );
}
