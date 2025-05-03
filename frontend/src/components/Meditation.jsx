import React, { useState, useEffect } from 'react';
import '../style/Meditation.css';

// Component for the meditation timer
const MeditationTimer = ({ onTimerUpdate }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selectedTime, setSelectedTime] = useState(300); // 5 minutes default

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          const newValue = prevSeconds + 1;
          onTimerUpdate(newValue);
          return newValue;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, onTimerUpdate]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
    onTimerUpdate(0);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    resetTimer();
  };

  return (
    <div className="meditation-timer">
      <div className="timer-display">
        <div className="timer-circle">
          <div className="timer-circle-inner">
            <div className="timer-time">{formatTime(seconds)}</div>
            <div className="timer-target">/{formatTime(selectedTime)}</div>
          </div>
        </div>
      </div>
      
      <div className="timer-options">
        <button className={`time-option ${selectedTime === 180 ? 'active' : ''}`} onClick={() => handleTimeSelection(180)}>3 min</button>
        <button className={`time-option ${selectedTime === 300 ? 'active' : ''}`} onClick={() => handleTimeSelection(300)}>5 min</button>
        <button className={`time-option ${selectedTime === 600 ? 'active' : ''}`} onClick={() => handleTimeSelection(600)}>10 min</button>
        <button className={`time-option ${selectedTime === 1200 ? 'active' : ''}`} onClick={() => handleTimeSelection(1200)}>20 min</button>
      </div>
      
      <div className="timer-controls">
        <button className="control-button reset" onClick={resetTimer}>
          <i className="icon-reset"></i>
          <span>Reset</span>
        </button>
        <button className={`control-button ${isRunning ? 'pause' : 'play'}`} onClick={toggleTimer}>
          <div className="play-pause-icon">
            {isRunning ? (
              <div className="pause-icon"></div>
            ) : (
              <div className="play-icon"></div>
            )}
          </div>
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>
      </div>
    </div>
  );
};

// Component for meditation benefits
const MeditationBenefits = () => {
  return (
    <div className="benefits-container">
      <h3>Benefits of Meditation</h3>
      <div className="benefits-grid">
        <div className="benefit-card">
          <div className="benefit-icon stress"></div>
          <h4>Stress Reduction</h4>
          <p>Lowers cortisol levels and helps manage anxiety</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon focus"></div>
          <h4>Better Focus</h4>
          <p>Improves concentration and mental clarity</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon sleep"></div>
          <h4>Improved Sleep</h4>
          <p>Helps you fall asleep faster and sleep more deeply</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon heart"></div>
          <h4>Heart Health</h4>
          <p>Lowers blood pressure and reduces strain on the heart</p>
        </div>
      </div>
    </div>
  );
};

// Component for user stats
const UserStats = ({ totalSessions, totalMinutes, currentStreak }) => {
  return (
    <div className="stats-container">
      <h3>Your Meditation Journey</h3>
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-number">{totalSessions}</div>
          <div className="stat-label">Total Sessions</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{Math.floor(totalMinutes / 60)}<span>h</span> {totalMinutes % 60}<span>m</span></div>
          <div className="stat-label">Time Meditated</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{currentStreak} <span className="fire-emoji">🔥</span></div>
          <div className="stat-label">Day Streak</div>
        </div>
      </div>
    </div>
  );
};

// Component for inspiration quote
const InspirationQuote = () => {
  const quotes = [
    { text: "Breathing in, I calm my body. Breathing out, I smile.", author: "Thich Nhat Hanh" },
    { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh" },
    { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
    { text: "The mind is everything. What you think you become.", author: "Buddha" },
    { text: "You cannot control the waves, but you can learn to surf.", author: "Jon Kabat-Zinn" }
  ];
  
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  return (
    <div className="quote-container">
      <div className="quote-content">
        <div className="quote-marks">"</div>
        <p className="quote-text">{randomQuote.text}</p>
        <p className="quote-author">— {randomQuote.author}</p>
      </div>
    </div>
  );
};

// Main MeditationPage component
const MeditationPage = () => {
  const [userStats, setUserStats] = useState({
    totalSessions: 42,
    totalMinutes: 478, // Total minutes meditated
    currentStreak: 7,
  });
  
  const handleTimerUpdate = (seconds) => {
    // Update user stats as needed based on timer progress
    // This is just a placeholder for actual logic
    console.log("Timer updated:", seconds);
  };

  return (
    <div className="meditation-page">
      <header className="meditation-header">
        <div className="header-content">
          <h1>Meditation</h1>
          <p>Find your inner peace</p>
        </div>
        <div className="animated-orbs">
          <div className="orb orb1"></div>
          <div className="orb orb2"></div>
          <div className="orb orb3"></div>
        </div>
      </header>
      
      <main className="meditation-content">
        <MeditationTimer onTimerUpdate={handleTimerUpdate} />
        
        <div className="secondary-content">
          <UserStats 
            totalSessions={userStats.totalSessions}
            totalMinutes={userStats.totalMinutes}
            currentStreak={userStats.currentStreak}
          />
          
          <InspirationQuote />
        </div>
        
        <MeditationBenefits />
      </main>
    </div>
  );
};

export default MeditationPage;