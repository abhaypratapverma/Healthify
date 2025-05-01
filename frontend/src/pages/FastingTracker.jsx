import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../style/fastingTracker.css'; // Import your CSS styles here

const AdvancedFastingTracker = () => {
  // State variables
  const [isFasting, setIsFasting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(16); // Default 16 hours
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [quote, setQuote] = useState('');
  const [showGoalSelector, setShowGoalSelector] = useState(false);
  const goalSelectorRef = useRef(null);
  const API = import.meta.env.VITE_API_URL;

  // Array of motivational quotes
  const motivationalQuotes = [
    "Fasting is not about starving yourself; it's about healing yourself.",
    "The food you eat can be either the safest & most powerful form of medicine or the slowest form of poison.",
    "Your body is a temple, but only if you treat it as one.",
    "The best time to start was yesterday. The next best time is now.",
    "An hour of fasting is worth a day of prayer.",
    "Fasting is the first principle of medicine.",
    "A little hunger can bring out a lot of resolve.",
    "Your health is an investment, not an expense.",
    "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.",
    "Fasting cleanses the body, clears the mind, and cleanses the soul."
  ];

  // Goals options (in hours)
  const fastingGoals = [14, 16, 18, 20, 24];

  // Fetch fasting history from the backend
  useEffect(() => {
    const fetchFastingHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API}/api/fasting`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching fasting history:', error.response?.data?.message || error.message);
      }
    };

    fetchFastingHistory();
  }, [API]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (isFasting && startTime) {
      timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isFasting, startTime]);

  // Calculate elapsed time
  useEffect(() => {
    if (isFasting && startTime) {
      const elapsed = currentTime - new Date(startTime);
      setElapsedTime(elapsed);
    }
  }, [currentTime, isFasting, startTime]);

  // Rotate quotes
  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);

    const quoteInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setQuote(motivationalQuotes[randomIndex]);
    }, 30000); // Rotate every 30 seconds

    return () => clearInterval(quoteInterval);
  }, []);

  // Format time from milliseconds to HH:MM:SS
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const goalMs = selectedGoal * 60 * 60 * 1000;
    return Math.min((elapsedTime / goalMs) * 100, 100);
  };

  // Start or stop fasting
  const toggleFasting = async () => {
    if (!isFasting) {
      const now = new Date();
      setStartTime(now);
      setElapsedTime(0);
      setIsFasting(true);
      setEndTime(null);
    } else {
      const now = new Date();
      setEndTime(now);
      setIsFasting(false);

      // Calculate duration
      const duration = (now - new Date(startTime)) / (1000 * 60 * 60); // Duration in hours

      // Save fasting session to the backend
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${API}/api/fasting`,
          {
            startTime,
            endTime: now,
            notes: `Fasted for ${duration.toFixed(2)} hours`,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Update history with the new session
        setHistory((prevHistory) => [response.data, ...prevHistory]);
      } catch (error) {
        console.error('Error saving fasting session:', error.response?.data?.message || error.message);
      }
    }
  };

  // Set fasting goal
  const changeGoal = (hours) => {
    setSelectedGoal(hours);
    setShowGoalSelector(false);
  };

  // Calculate stroke-dasharray and stroke-dashoffset for SVG circle
  const calculateCircleProgress = () => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const progress = calculateProgress();
    const offset = circumference - (progress / 100) * circumference;

    return {
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: offset
    };
  };

  const circleStyle = calculateCircleProgress();

  return (
    <div className="advanced-fasting-tracker">
      <div className="fasting-card">
        <h1 className="app-title">Fasting Tracker</h1>

        <div className="top-section">
          <div className="progress-ring-container">
            <svg className="progress-ring" width="200" height="200" viewBox="0 0 200 200">
              <circle className="progress-ring-circle-bg" cx="100" cy="100" r="70" />
              <circle
                className="progress-ring-circle"
                cx="100"
                cy="100"
                r="70"
                style={{
                  strokeDasharray: circleStyle.strokeDasharray,
                  strokeDashoffset: circleStyle.strokeDashoffset
                }}
              />
              <text x="100" y="90" textAnchor="middle" className="timer-text">
                {formatTime(elapsedTime)}
              </text>
              <text x="100" y="115" textAnchor="middle" className="goal-text">
                Goal: {selectedGoal}h
              </text>
            </svg>

            <div className="progress-percentage">
              {Math.floor(calculateProgress())}%
            </div>
          </div>

          <div className="controls-section">
            <div className="goal-selector-container" ref={goalSelectorRef}>
              <button
                className="goal-selector-button"
                onClick={() => setShowGoalSelector(!showGoalSelector)}
              >
                <span>{selectedGoal} Hours</span>
                <span className="arrow-down">▼</span>
              </button>

              {showGoalSelector && (
                <div className="goal-dropdown">
                  {fastingGoals.map((hours) => (
                    <div
                      key={hours}
                      className={`goal-option ${selectedGoal === hours ? 'active' : ''}`}
                      onClick={() => changeGoal(hours)}
                    >
                      {hours} Hours
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              className={`fasting-toggle-button ${isFasting ? 'stop' : 'start'}`}
              onClick={toggleFasting}
            >
              {isFasting ? 'Stop Fasting' : 'Start Fasting'}
            </button>
          </div>
        </div>

        <div className="quote-container">
          <p className="quote-text">"{quote}"</p>
        </div>

        <div className="history-section">
          <h2 className="section-title">Fasting History</h2>

          <div className="history-list">
            {history.length > 0 ? (
              history.map((session) => (
                <div key={session._id} className="history-item">
                  <div className="history-date">
                    {new Date(session.startTime).toLocaleDateString()} - {new Date(session.endTime).toLocaleDateString()}
                  </div>
                  <div className="history-duration">
                    Duration: {session.duration.toFixed(2)} hours
                  </div>
                  <div className="history-notes">
                    Notes: {session.notes}
                  </div>
                </div>
              ))
            ) : (
              <p>No fasting history available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFastingTracker;
