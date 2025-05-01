import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import "../style/insights.css"; // Ensure this CSS file exists and is styled appropriately
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Side_Nav from "../components/Side_Nav"; // Assuming you have a Side_Nav component for navigation

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Insights = () => {
  const [bmiData, setBmiData] = useState([22.4, 22.2, 22.0, 21.9, 21.8, 21.7, 21.6]);
  const [stepsData, setStepsData] = useState([7500, 8000, 8500, 9000, 9500, 10000, 10500]);
  const [walkingProgress, setWalkingProgress] = useState([30, 45, 60, 50, 70, 80, 90]); // Walking progress in minutes
  const [fastingTime, setFastingTime] = useState([12, 14, 16, 15, 13, 14, 16]); // Fasting time in hours
  const [foodData, setFoodData] = useState([2000, 2500, 2200, 1800, 2100, 2300, 2000]); // Example calories intake data
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: "Dr. Affandi Malik", patient: "Steve Mariyadi", date: "2025-04-29", disease: "Fever", status: "Confirmed" },
    { id: 2, doctor: "Dr. Aisyah Zahra", patient: "Lilly Wardhani", date: "2025-04-30", disease: "Toothache", status: "Pending" },
    { id: 3, doctor: "Dr. Lamine Haryono", patient: "Sari Nurhayati", date: "2025-05-01", disease: "Vertigo", status: "Booked" },
    { id: 4, doctor: "Dr. Othman Ibrahim", patient: "James Budiman", date: "2025-05-02", disease: "Sore Eyes", status: "Uploaded" },
  ]);

  const bmiChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "BMI Progress",
        data: bmiData,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const walkingChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Walking Progress (Minutes)",
        data: walkingProgress,
        backgroundColor: "rgba(33, 150, 243, 0.6)",
        borderColor: "#2196F3",
        borderWidth: 2,
        borderRadius: 10,
        barPercentage: 0.5,
      },
    ],
  };

  const foodChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Calories Intake (kcal)",
        data: foodData,
        backgroundColor: "rgba(255, 87, 34, 0.6)",
        borderColor: "#FF5722",
        borderWidth: 2,
        borderRadius: 10,
        barPercentage: 0.5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#e0e0e0",
        },
        ticks: {
          color: "#757575",
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div>
      <Side_Nav />
      <div className="main-content">
        <div className="insights-container">
          {/* Header */}
          <header className="dashboard-header">
            <h1>Insights</h1>
            <p>Hi! User</p>
          </header>

          {/* Summary Cards */}
          <div className="summary-stats">
            <div className="stat-card">
              <h3>BMI</h3>
              <p className="stat-value">{bmiData[bmiData.length - 1].toFixed(1)}</p>
              <small>Last week: {bmiData[0]}</small>
            </div>
            <div className="stat-card">
              <h3>Steps</h3>
              <p className="stat-value">{stepsData.reduce((a, b) => a + b, 0)}</p>
              <small>Goal: 10,000 steps</small>
            </div>
            <div className="stat-card">
              <h3>Walking Minutes</h3>
              <p className="stat-value">{walkingProgress.reduce((a, b) => a + b, 0)} min</p>
              <small>Goal: 500 min</small>
            </div>
            <div className="stat-card">
              <h3>Fasting Time</h3>
              <p className="stat-value">{fastingTime.reduce((a, b) => a + b, 0)} hrs</p>
              <small>Goal: 16 hrs/day</small>
            </div>
          </div>

          {/* Charts Section */}
          <div className="chart-section-container">
            <div className="chart-section">
              <h2>BMI Progress</h2>
              <Line data={bmiChartData} options={chartOptions} />
            </div>
            <div className="chart-section">
              <h2>Walking Progress</h2>
              <Bar data={walkingChartData} options={chartOptions} />
            </div>
            <div className="chart-section">
              <h2>Calories Intake</h2>
              <Bar data={foodChartData} options={chartOptions} />
            </div>
          </div>

          {/* Appointments Section */}
          <div className="appointments-section">
            <h2>All Appointments</h2>
            <p>Upcoming appointments overview in this week</p>
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Assigned Doctor</th>
                  <th>Patient Name</th>
                  <th>Date</th>
                  <th>Disease</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.patient}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.disease}</td>
                    <td className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
