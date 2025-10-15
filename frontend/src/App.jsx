import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import EventPage from "./pages/EventPage.jsx";
import DayPage from "./pages/DayPage.jsx";
import ActivityPage from "./pages/ActivityPage.jsx";
import BudgetPage from "./pages/BudgetPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Event & Related Pages */}
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/day/:dayId" element={<DayPage />} />
        <Route path="/activity/:activityId" element={<ActivityPage />} />
        <Route path="/budget" element={<BudgetPage />} />

        {/* Fallback / 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col justify-center items-center text-gray-200 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700">
              <h1 className="text-4xl font-bold mb-4">404</h1>
              <p className="text-xl mb-4">Page not found.</p>
              <a
                href="/"
                className="text-indigo-400 hover:text-orange-400 font-semibold"
              >
                Go back home
              </a>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
