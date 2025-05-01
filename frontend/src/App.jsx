import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./components/auth/LoginPage";
import Home from "./Home";
import { BmiCalculator } from "./pages/BmiCalculator";
import FastingTracker from "./pages/FastingTracker";
import ActivityLogger from "./pages/ActivityLogger";
import Consultancy from "./pages/consultancy/Consultancy";
import ConsultantProfile from "./pages/consultancy/ConsultancyProfile";
import Insights from "./pages/Insights";
import Community from "./pages/Community";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      {/* Navbar appears on all pages */}
      <Navbar />

      <Routes>
        {/* Default Route: Go to Home directly */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Optional Auth Route */}
        <Route path="/auth" element={<LoginPage />} />

        {/* Unprotected Routes (No login required) */}
        <Route path="/home" element={<><Home /><Footer /></>} />
        <Route path="/bmi" element={<><BmiCalculator /><Footer /></>} />
        <Route path="/fasting" element={<><FastingTracker /><Footer /></>} />
        <Route path="/activity" element={<><ActivityLogger /><Footer /></>} />
        <Route path="/consultancy" element={<><Consultancy /><Footer /></>} />
        <Route path="/consultants/:id" element={<><ConsultantProfile /><Footer /></>} />
        <Route path="/insights" element={<><Insights /><Footer /></>} />
        <Route path="/community" element={<><Community /><Footer /></>} />
      </Routes>
    </Router>
  );
}

export default App;
