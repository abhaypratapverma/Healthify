import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../style/consultancyProfile.css";

const ConsultancyProfile = () => {
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

  const handleStartVideoCall = () => {
    navigate(`/video-call/${consultant.id}`, { state: { consultant } });
  };

  const roomLink = `${window.location.origin}/video-call/${consultant.id}`;

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
          <button onClick={handleStartVideoCall} className="book-button">
            Start Video Call
          </button>
          <button onClick={() => navigate("/consultancy")} className="callback-button">
            Back to List
          </button>
        </div>
      </div>

      <div className="room-link">
        <p>Share this link to join the call:</p>
        <input type="text" value={roomLink} readOnly />
        <button onClick={() => navigator.clipboard.writeText(roomLink)}>Copy Link</button>
      </div>
    </div>
  );
};

export default ConsultancyProfile;
