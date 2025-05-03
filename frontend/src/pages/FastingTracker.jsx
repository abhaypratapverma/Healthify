import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../style/fastingTracker.css';

const AdvancedFastingTracker = () => {
  const [isFasting, setIsFasting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(16);
  const [history, setHistory] = useState([]);
  const [quote, setQuote] = useState('');
  const [showGoalSelector, setShowGoalSelector] = useState(false);
  const goalSelectorRef = useRef(null);
  const API = import.meta.env.VITE_API_URL;

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

  const fastingGoals = [14, 16, 18, 20, 24];

  useEffect(() => {
    const fetchFastingHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API}/api/fasting`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        console.error('Error fetching fasting history:', error.response?.data?.message || error.message);
      }
    };
    fetchFastingHistory();
  }, [API]);

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

  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);

    const quoteInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setQuote(motivationalQuotes[randomIndex]);
    }, 30000);

    return () => clearInterval(quoteInterval);
  }, []);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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

      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${API}/api/fasting`,
          {
            startTime: startTime.toISOString(),
            endTime: now.toISOString(),
            notes: `Felt great, stayed hydrated.`,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setHistory((prevHistory) => [response.data, ...prevHistory]);
      } catch (error) {
        console.error('Error saving fasting session:', error.response?.data?.message || error.message);
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
      strokeDashoffset: offset,
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
                cx="100" cy="100" r="70"
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

          <div className="control-buttons">
            <button
              onClick={toggleFasting}
              className={`toggle-button ${isFasting ? 'stop' : 'start'}`}
            >
              {isFasting ? 'Stop Fasting' : 'Start Fasting'}
            </button>

            <div className="goal-selector">
              <button onClick={() => setShowGoalSelector(!showGoalSelector)}>
                Change Goal
              </button>
              {showGoalSelector && (
                <div className="goal-options" ref={goalSelectorRef}>
                  {fastingGoals.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => changeGoal(goal)}
                      className="goal-option-button"
                    >
                      {goal} hours
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="quote-section">
          <p className="motivational-quote">{quote}</p>
        </div>

        <div className="history-section">
          <h2>Fasting History</h2>
          <ul>
            {history.map((record) => (
              <li key={record._id} className="history-record">
                <div><strong>Start:</strong> {new Date(record.startTime).toLocaleString()}</div>
                <div><strong>End:</strong> {new Date(record.endTime).toLocaleString()}</div>
                <div><strong>Duration:</strong> {record.duration.toFixed(2)} hours</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFastingTracker;
