import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { EventsProvider } from "./providers/EventsProvider.jsx";
import { DaysProvider } from "./providers/DaysProvider.jsx";
import { ActivitiesProvider } from "./providers/ActivitiesProvider.jsx";
import { UserProvider } from "./providers/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <EventsProvider>
        <DaysProvider>
          <ActivitiesProvider>
            <App />
          </ActivitiesProvider>
        </DaysProvider>
      </EventsProvider>
    </UserProvider>
  </StrictMode>
);
