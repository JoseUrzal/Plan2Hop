import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../providers/EventsProvider";
import { useDays } from "../providers/DaysProvider";
import Header from "../components/Header";
import EventDescription from "../components/descriptions/EventDescription";
import DaysContainer from "../components/containers/DaysContainer";
import SaveCard from "../components/cards/SaveCard";
import BudgetCard from "../components/cards/BudgetCard";
import { useActivities } from "../providers/ActivitiesProvider";

export default function EventPage() {
  const { eventId } = useParams();
  const { events, updateEvent } = useEvents();
  const { days } = useDays();
  const { fetchActivitiesByDay } = useActivities();

  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentEventActivities, setCurrentEventActivities] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const e = events.find((ev) => ev.id === parseInt(eventId));
    setCurrentEvent(e);

    const eventDays = days.filter((d) => d.eventId === parseInt(eventId));
    if (eventDays.length === 0) return;

    async function fetchAllActivities() {
      // Fetch all days in parallel
      const fetchPromises = eventDays.map(async (day) => {
        const acts = await fetchActivitiesByDay(day.id);
        return { dayId: day.id, activities: acts };
      });

      const results = await Promise.all(fetchPromises);

      // Convert to object { dayId: [activities] }
      const activitiesByDay = {};
      let grandTotal = 0;

      results.forEach(({ dayId, activities }) => {
        activitiesByDay[dayId] = activities;
        grandTotal += activities.reduce(
          (sum, act) => sum + (Number(act.cost) || 0),
          0
        );
      });

      setCurrentEventActivities(activitiesByDay);
      setTotalCost(grandTotal);
    }

    fetchAllActivities();
  }, [events, days, eventId]);

  if (!currentEvent) {
    return <div className="text-center mt-8">Event not found</div>;
  }

  // Calculate spentBudget dynamically from currentEventActivities
  const spentBudget = Object.values(currentEventActivities).reduce(
    (sum, acts) =>
      sum + acts.reduce((daySum, act) => daySum + (Number(act.cost) || 0), 0),
    0
  );

  return (
    <div className="space-y-8 px-4 md:px-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 min-h-screen">
      <Header />
      <EventDescription
        event={currentEvent}
        onUpdate={() => updateEvent({ ...currentEvent, days })}
      />
      <BudgetCard budget={currentEvent?.budgetLimit || 0} spent={spentBudget} />
      <DaysContainer eventId={currentEvent.id} />
      <SaveCard onClick={() => updateEvent({ ...currentEvent, days })} />
    </div>
  );
}
