import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { EventsProvider } from "./providers/EventsProvider.jsx";
import { DaysProvider } from "./providers/DaysProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EventsProvider>
      <DaysProvider>
        <App />
      </DaysProvider>
    </EventsProvider>
  </StrictMode>
);
