import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import EventPage from "./pages/EventPage.jsx";
import DayPage from "./pages/DayPage.jsx";
import BudgetPage from "./pages/BudgetPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/day/:dayId" element={<DayPage />} />
        <Route path="/budget" element={<BudgetPage />} />
      </Routes>
    </Router>
  );
}

export default App;
