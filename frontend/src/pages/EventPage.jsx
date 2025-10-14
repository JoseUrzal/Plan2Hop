import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../providers/EventsProvider";
import { useDays } from "../providers/DaysProvider";
import Header from "../components/Header";
import EventDescription from "../components/descriptions/EventDescription";
import DaysContainer from "../components/containers/DaysContainer";
import SaveButton from "../components/SaveButton";
import BudgetCard from "../components/cards/BudgetCard";
import { useActivities } from "../providers/ActivitiesProvider";

export default function EventPage() {
  const { eventId } = useParams();
  const { events, updateEvent } = useEvents();
  const { days, addDay } = useDays();
  const { activities, fetchActivitiesByDay } = useActivities();
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    const e = events.find((ev) => ev.id === parseInt(eventId));
    setCurrentEvent(e);
    // fetch activities for all days of this event
    const eventDays = days.filter((d) => d.eventId === parseInt(eventId));
    eventDays.forEach((day) => fetchActivitiesByDay(day.id));
  }, [events, days, eventId]);

  if (!currentEvent)
    return <div className="text-center mt-8">Event not found</div>;

  const eventDayIds = days
    .filter((d) => d.eventId === currentEvent.id)
    .map((d) => d.id);

  const eventActivities = activities.filter((a) =>
    eventDayIds.includes(a.dayId)
  );

  const spentBudget = eventActivities.reduce(
    (sum, act) => sum + (Number(act.cost) || 0),
    0
  );

  return (
    <div className="space-y-8 px-4 md:px-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 min-h-screen">
      <Header />
      <EventDescription />
      <BudgetCard budget={currentEvent?.budgetLimit || 0} spent={spentBudget} />
      <DaysContainer eventId={currentEvent.id} />
      <SaveButton onClick={() => updateEvent({ ...currentEvent, days })} />
    </div>
  );
}
