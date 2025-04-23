
import './App.css'
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import LoginPage from './components/auth/LoginPage'
import Home from './Home'
import { BmiCalculator } from './components/BmiCalculator'


function App() {
  return (
    <>
     
     <Router>
      <Routes>
         <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path = '/bmicalculator' element={<BmiCalculator/>} />
       
      </Routes>
     </Router>
    </>
  )
}

export default App
