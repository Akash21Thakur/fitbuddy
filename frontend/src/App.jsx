import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import DailyCheckIn from "./pages/DailyCheckIn";
import ChatPage from "./pages/ChatPage";
import WorkoutMealPlanPage from "./pages/WorkoutMealPlanPage"; // ✅ new
import Layout from "./components/Layout";
import ProgressPage from "./pages/ProgressPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/plans" element={<WorkoutMealPlanPage goal="gain" />} /> {/* ✅ Replaces settings */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/check-in" element={<DailyCheckIn />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Route>

        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
