import React, { useState, useEffect } from 'react';
import '../style/activitylogger.css';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { saveAs } from 'file-saver';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ActivityLogger = () => {
  const [activity, setActivity] = useState({
    type: '',
    duration: '',
    intensity: '',
    calories: '',
    notes: '',
    time: '',
  });

  const [activityHistory, setActivityHistory] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('activityHistory')) || [];
    setActivityHistory(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('activityHistory', JSON.stringify(activityHistory));
    updateBadges();
  }, [activityHistory]);

  const handleChange = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const newEntry = {
      ...activity,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };

    let updated = [...activityHistory];
    if (editIndex !== null) {
      updated[editIndex] = newEntry;
      setEditIndex(null);
    } else {
      updated.push(newEntry);
    }

    setActivityHistory(updated);
    setActivity({
      type: '',
      duration: '',
      intensity: '',
      calories: '',
      notes: '',
      time: '',
    });
  };

  const handleDelete = (index) => {
    const updated = [...activityHistory];
    updated.splice(index, 1);
    setActivityHistory(updated);
  };

  const handleEdit = (index) => {
    const entry = activityHistory[index];
    setActivity(entry);
    setEditIndex(index);
  };

  const filteredHistory = activityHistory.filter((entry) =>
    entry.type.toLowerCase().includes(filterText.toLowerCase())
  );

  const dailySummary = {};
  filteredHistory.forEach(({ date, calories }) => {
    dailySummary[date] = (dailySummary[date] || 0) + Number(calories);
  });

  const chartData = {
    labels: Object.keys(dailySummary),
    datasets: [
      {
        label: 'Calories Burned',
        data: Object.values(dailySummary),
        backgroundColor: '#4caf50',
        borderRadius: 5,
      },
    ],
  };

  const updateBadges = () => {
    const today = new Date().toLocaleDateString();
    const todayActivities = activityHistory.filter((a) => a.date === today);
    const totalToday = todayActivities.reduce((acc, curr) => acc + Number(curr.calories), 0);

    let earned = [];
    if (todayActivities.length >= 3) earned.push('🎯 3+ Activities Today');
    if (totalToday >= 1000) earned.push('🔥 1000+ Calories Burned');
    if (activityHistory.length >= 10) earned.push('📈 10 Activities Logged');

    setBadges(earned);
  };

  const exportCSV = () => {
    const headers = 'Type,Duration,Intensity,Calories,Notes,Date,Time\n';
    const rows = activityHistory.map((a) =>
      `${a.type},${a.duration},${a.intensity},${a.calories},"${a.notes}",${a.date},${a.time}`
    );
    const blob = new Blob([headers + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'activity_log.csv');
  };

  const intensityColors = {
    Light: '#81c784',
    Moderate: '#4caf50',
    Vigorous: '#e53935',
  };

  return (
    <div className="activity-logger">
      <h2>Activity Logger</h2>

      <form onSubmit={handleSubmit} className="activity-form">
        <div className="form-row">
          <div className="form-group">
            <label>Activity Type</label>
            <input
              type="text"
              name="type"
              placeholder="e.g. Running"
              value={activity.type}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Duration (min)</label>
            <input
              type="number"
              name="duration"
              placeholder="e.g. 30"
              value={activity.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Intensity</label>
            <select
              name="intensity"
              value={activity.intensity}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Light">Light</option>
              <option value="Moderate">Moderate</option>
              <option value="Vigorous">Vigorous</option>
            </select>
          </div>
          <div className="form-group">
            <label>Calories Burned</label>
            <input
              type="number"
              name="calories"
              placeholder="e.g. 300"
              value={activity.calories}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            rows="3"
            placeholder="e.g. Felt energetic, nice weather..."
            value={activity.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="log-button">
          {editIndex !== null ? 'Update Activity' : 'Log Activity'}
        </button>
      </form>

      <div className="summary">
        <span>Total Entries: {activityHistory.length}</span>
        <button className="clear-button" onClick={() => setActivityHistory([])}>
          Clear History
        </button>
      </div>

      <div className="chart-container">
        <h3>Daily Calories Burned</h3>
        <Bar data={chartData} />
      </div>

      <div className="history">
        <h3>Activity History</h3>
        <ul>
          {filteredHistory.map((entry, index) => (
            <li key={index} className="activity-item">
              <div>
                <span>{entry.type}</span>
                <span className="date">{entry.date}</span>
                <span className="notes">{entry.notes}</span>
              </div>
              <div>
                <span className="calories">{entry.calories} Calories</span>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="badges">
        {badges.map((badge, index) => (
          <span key={index} className="badge">
            {badge}
          </span>
        ))}
      </div>

      <div className="export">
        <button onClick={exportCSV}>Export CSV</button>
      </div>
    </div>
  );
};

export default ActivityLogger;