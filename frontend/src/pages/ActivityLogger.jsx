import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';  // Assuming you use axios
import '../style/fastingTracker.css'; // Import your CSS

const AdvancedFastingTracker = () => {
  const [isFasting, setIsFasting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(16);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [showGoalSelector, setShowGoalSelector] = useState(false);
  const [quote, setQuote] = useState('');
  const goalSelectorRef = useRef(null);

  const motivationalQuotes = [
    "Fasting is not about starving yourself; it's about healing yourself.",
    "Your body is a temple, but only if you treat it as one.",
    "The best time to start was yesterday. The next best time is now.",
    "Fasting is the first principle of medicine.",
    "A little hunger can bring out a lot of resolve.",
    "Your health is an investment, not an expense.",
    "When diet is correct, medicine is of no need.",
    "Fasting cleanses the body, clears the mind, and cleanses the soul."
  ];

  const fastingGoals = [14, 16, 18, 20, 24];

  // ⏳ Setup timer
  useEffect(() => {
    let timer;
    if (isFasting && startTime) {
      timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isFasting, startTime]);

  useEffect(() => {
    if (isFasting && startTime) {
      const elapsed = currentTime - new Date(startTime);
      setElapsedTime(elapsed);
    }
  }, [currentTime, isFasting, startTime]);

  // 🔥 Load history & streak from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/fasting/history');
        setHistory(res.data.history || []);
        setStreak(res.data.streak || 0);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    fetchData();
  }, []);

  // 🎯 Handle outside click for goal selector
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (goalSelectorRef.current && !goalSelectorRef.current.contains(event.target)) {
        setShowGoalSelector(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 📜 Rotate quotes
  useEffect(() => {
    const randomizeQuote = () => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setQuote(motivationalQuotes[randomIndex]);
    };
    randomizeQuote();
    const interval = setInterval(randomizeQuote, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    const goalMs = selectedGoal * 60 * 60 * 1000;
    return Math.min((elapsedTime / goalMs) * 100, 100);
  };

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

      const newSession = {
        date: now.toISOString(),
        startTime: new Date(startTime).toISOString(),
        endTime: now.toISOString(),
        duration: now - new Date(startTime),
        goalAchieved: (now - new Date(startTime)) >= selectedGoal * 60 * 60 * 1000
      };

      // Save session to backend
      try {
        const res = await axios.post('/api/fasting/session', newSession);
        setHistory(prev => [res.data.session, ...prev].slice(0, 30));
        setStreak(res.data.streak); // Assume backend sends updated streak
      } catch (error) {
        console.error('Failed to save session:', error);
      }
    }
  };

  const changeGoal = (hours) => {
    setSelectedGoal(hours);
    setShowGoalSelector(false);
  };

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

            <div className="progress-percentage">{Math.floor(calculateProgress())}%</div>
          </div>

          <div className="controls-section">
            <div className="goal-selector-container" ref={goalSelectorRef}>
              <button className="goal-selector-button" onClick={() => setShowGoalSelector(!showGoalSelector)}>
                <span>{selectedGoal} Hours</span>
                <span className="arrow-down">▼</span>
              </button>

              {showGoalSelector && (
                <div className="goal-dropdown">
                  {fastingGoals.map(hours => (
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

            {streak > 0 && (
              <div className="streak-badge">
                <div className="streak-number">{streak}</div>
                <div className="streak-label">Day{streak !== 1 ? 's' : ''} Streak</div>
              </div>
            )}
          </div>
        </div>

        <div className="quote-container">
          <p className="quote-text">"{quote}"</p>
        </div>

        <div className="history-section">
          <h2 className="section-title">Fasting History</h2>
          <div className="history-list">
            {history.length > 0 ? (
              history.map(session => (
                <div
                  key={session._id || session.id}
                  className={`history-item ${session.goalAchieved ? 'achieved' : 'missed'}`}
                >
                  <div>
                    <div><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</div>
                    <div><strong>Start:</strong> {new Date(session.startTime).toLocaleTimeString()}</div>
                    <div><strong>End:</strong> {new Date(session.endTime).toLocaleTimeString()}</div>
                    <div><strong>Duration:</strong> {formatTime(session.duration)}</div>
                  </div>
                </div>
              ))
            ) : (
              <div>No fasting history yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFastingTracker;
