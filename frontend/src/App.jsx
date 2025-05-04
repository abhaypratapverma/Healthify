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
import Meditation from "./components/Meditation";
import NutritionalValues from "./components/NutritionalValues";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import VideoCallPage from "./components/VideoCallPage";

// Layout wrapper for pages with Navbar and Footer
const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route: Redirect to /auth */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* Authentication Route */}
        <Route path="/auth" element={<LoginPage />} />

        {/* Protected/Unprotected Routes with Layout */}
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/bmi"
          element={
            <Layout>
              <BmiCalculator />
            </Layout>
          }
        />
        <Route
          path="/fasting"
          element={
            <Layout>
              <FastingTracker />
            </Layout>
          }
        />
        <Route
          path="/activity"
          element={
            <Layout>
              <ActivityLogger />
            </Layout>
          }
        />
        <Route
          path="/consultancy"
          element={
            <Layout>
              <Consultancy />
            </Layout>
          }
        />
        <Route
          path="/consultants/:id"
          element={
            <Layout>
              <ConsultantProfile />
            </Layout>
          }
        />
        <Route
          path="/video-call/:roomId"
          element={
            <Layout>
              <VideoCallPage />
            </Layout>
          }
        />

        <Route
          path="/insights"
          element={
            <Layout>
              <Insights />
            </Layout>
          }
        />
        <Route
          path="/community"
          element={
            <Layout>
              <Community />
            </Layout>
          }
        />
        <Route
          path="/meditation"
          element={
            <Layout>
              <Meditation />
            </Layout>
          }
        />
        <Route
          path="/nutrition"
          element={
            <Layout>
              <NutritionalValues />
            </Layout>
          }
        />
        <Route
          path="/video-call"
          element={
            <Layout>
              <VideoCallPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
