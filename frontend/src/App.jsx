
import './App.css'
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import LoginPage from './components/auth/LoginPage'
import Home from './Home'


function App() {
  return (
    <>
     
     <Router>
      <Routes>
         <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
       
      </Routes>
     </Router>
    </>
  )
}

export default App
