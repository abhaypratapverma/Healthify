
import './App.css'
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import LoginPage from './components/auth/LoginPage'
import Home from './Home'
import { BmiCalculator } from './pages/BmiCalculator'
import FastingTracker from './pages/FastingTracker'
import ActivityLogger from './pages/ActivityLogger'
import Consultancy from './pages/consultancy/Consultancy'
import ConsultantProfile from './pages/consultancy/ConsultancyProfile'
import Insights from './pages/Insights'
import Community from './pages/Community'

function App() {
  return (
    <>
     
     <Router>
      <Routes>
         <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bmi" element={<BmiCalculator />} />
        <Route path="/fasting" element={<FastingTracker />} />
        <Route path="/activity" element={<ActivityLogger/>} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/consultancy" element={<Consultancy />} />
        <Route path="/consultants/:id" element={<ConsultantProfile />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/community" element={<Community />} />
        {/* <Route path="/nutrition" element={<Nutrition />} /> */}
        {/* <Route path="/exercise" element={<Exercise />} /> */}
        {/* <Route path="/meditation" element={<Meditation />} /> */}
        {/* <Route path="/sleep" element={<Sleep />} /> */}
        {/* <Route path="/hydration" element={<Hydration />} /> */}
        {/* <Route path="/reminders" element={<Reminders />} /> */}
        {/* <Route path="/progress" element={<Progress />} /> */}
        {/* <Route path="/goals" element={<Goals />} /> */}
        {/* <Route path="/settings" element={<Settings />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/logout" element={<Logout />} /> */}
        {/* Add more routes as needed */}
       
      </Routes>
     </Router>
    </>
  )
}

export default App
