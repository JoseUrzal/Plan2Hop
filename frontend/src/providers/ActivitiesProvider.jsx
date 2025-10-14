import { createContext, useContext, useState } from "react";

const ActivitiesContext = createContext();

export const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  const fetchActivitiesByDay = async (dayId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/activities/by-day?dayId=${dayId}`
      );
      if (!res.ok) throw new Error("Failed to fetch activities");
      const data = await res.json();
      setActivities(data);
      console.log("Fetched activities for day", dayId);
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const addActivity = (activity) => {
    setActivities((prev) => [...prev, activity]);
  };

  const deleteActivity = (id) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
  };

  return (
    <ActivitiesContext.Provider
      value={{ activities, addActivity, fetchActivitiesByDay, deleteActivity }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
};

export const useActivities = () => useContext(ActivitiesContext);
