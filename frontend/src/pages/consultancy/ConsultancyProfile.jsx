import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../../style/consultancyProfile.css'; // 👈 import CSS

const ConsultantProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const consultant = location.state?.consultant;

  if (!consultant) {
    return (
      <div className="consultant-profile-error">
        <h2>No Consultant Data Found!</h2>
        <button onClick={() => navigate("/consultancy")}>Back to List</button>
      </div>
    );
  }

  const handleBookAppointment = () => {
    alert(`Appointment booked with ${consultant.name}!`);
  };

  const handleRequestCallback = () => {
    alert(`Callback requested from ${consultant.name}!`);
  };

  return (
    <div className="consultant-profile-container">
      <div className="consultant-profile-card">
        <img
          src={consultant.image}
          alt={consultant.name}
          className="consultant-profile-image"
        />
        <h1 className="consultant-profile-name">{consultant.name}</h1>
        <p className="consultant-profile-specialization">{consultant.specialization}</p>
        <p className="consultant-profile-experience">{consultant.experience}</p>
        <p className="consultant-profile-description">{consultant.description}</p>

        <div className="consultant-profile-buttons">
          <button onClick={handleBookAppointment} className="book-button">
            Book Appointment
          </button>
          <button onClick={handleRequestCallback} className="callback-button">
            Request Callback
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfile;
