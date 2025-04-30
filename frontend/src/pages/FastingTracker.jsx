import React, { useState, useEffect, useRef } from 'react';
import '../style/fastingTracker.css'; // Import your CSS styles here

const AdvancedFastingTracker = () => {
  // State variables
  const [isFasting, setIsFasting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);  // Ensure this is initialized to 0
  const [selectedGoal, setSelectedGoal] = useState(16); // Default 16 hours
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('fastingHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [streak, setStreak] = useState(() => {
    const savedStreak = localStorage.getItem('fastingStreak');
    return savedStreak ? parseInt(savedStreak) : 0;
  });
  const [showGoalSelector, setShowGoalSelector] = useState(false);
  const [quote, setQuote] = useState('');
  const goalSelectorRef = useRef(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (goalSelectorRef.current && !goalSelectorRef.current.contains(event.target)) {
        setShowGoalSelector(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      const elapsed = currentTime - startTime;
      setElapsedTime(elapsed);
    }
  }, [currentTime, isFasting, startTime]);

  // Load and save history and streak to localStorage
  useEffect(() => {
    localStorage.setItem('fastingHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('fastingStreak', streak.toString());
  }, [streak]);

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

  // Format date for history
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Format time for history
  const formatTimeOfDay = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const goalMs = selectedGoal * 60 * 60 * 1000;
    return Math.min((elapsedTime / goalMs) * 100, 100);
  };

  // Start or stop fasting
  const toggleFasting = () => {
    if (!isFasting) {
      const now = new Date();
      setStartTime(now);
      setElapsedTime(0);  // Ensure the timer starts from zero
      setIsFasting(true);
      setEndTime(null);
    } else {
      const now = new Date();
      setEndTime(now);
      setIsFasting(false);
      
      // Add to history
      const newSession = {
        id: Date.now(),
        date: new Date().toISOString(),
        startTime: startTime.toISOString(),
        endTime: now.toISOString(),
        duration: now - startTime,
        goalAchieved: (now - startTime) >= (selectedGoal * 60 * 60 * 1000)
      };
      
      // Update history
      setHistory(prevHistory => [newSession, ...prevHistory].slice(0, 30));
      
      // Check if goal was achieved and update streak
      if (newSession.goalAchieved) {
        // Check if the last successful fast was yesterday or today
        const lastSuccessfulFast = history.find(session => session.goalAchieved);
        
        if (lastSuccessfulFast) {
          const lastDate = new Date(lastSuccessfulFast.date).setHours(0, 0, 0, 0);
          const today = new Date().setHours(0, 0, 0, 0);
          const yesterday = new Date(today - 86400000).setHours(0, 0, 0, 0);
          
          if (lastDate === yesterday || lastDate === today) {
            setStreak(prevStreak => prevStreak + 1);
          } else {
            // Reset streak if more than a day has passed
            setStreak(1);
          }
        } else {
          // First successful fast
          setStreak(1);
        }
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
                  key={session.id} 
                  className={`history-item ${session.goalAchieved ? 'achieved' : 'not-achieved'}`}
                >
                  <div className="history-date">{formatDate(session.date)}</div>
                  <div className="history-times">
                    {formatTimeOfDay(session.startTime)} - {formatTimeOfDay(session.endTime)}
                  </div>
                  <div className="history-duration">
                    {formatTime(session.duration)}
                    {session.goalAchieved && <span className="achievement-badge">Goal Achieved</span>}
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
