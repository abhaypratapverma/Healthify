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
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bmi"
            element={
              <ProtectedRoute>
                <BmiCalculator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fasting"
            element={
              <ProtectedRoute>
                <FastingTracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/activity"
            element={
              <ProtectedRoute>
                <ActivityLogger />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consultancy"
            element={
              <ProtectedRoute>
                <Consultancy />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consultants/:id"
            element={
              <ProtectedRoute>
                <ConsultantProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/insights"
            element={
              <ProtectedRoute>
                <Insights />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
