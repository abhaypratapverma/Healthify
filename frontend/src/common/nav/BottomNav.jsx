import '../../style/BottomNav.css'; // Import the CSS file for styling
import cooking from "../../assets/homeImages/cooking.svg";
import beauty from "../../assets/homeImages/beauty.svg";
import Group9 from "../../assets/homeImages/Group 9.svg";
import Group8 from "../../assets/homeImages/Group 8.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BottomNav = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");

  return (
    <nav className="bottom-nav">
      <div className="nav-group">
        <button className="nav-button" onClick={() => { setActive("home"); navigate("/home"); }}>
          <div className={`nav-content ${active === "home" ? "active" : ""}`}>
            <img src={Group9} className="nav-icon" alt="Home" />
            <span className="nav-label">Home</span>
          </div>
        </button>
      </div>
      <div className="nav-group">
        <button className="nav-button" onClick={() => { setActive("fitness"); navigate("/fitness"); }}>
          <div className={`nav-content ${active === "fitness" ? "active" : ""}`}>
            <img src={Group8} className="nav-icon" alt="Fitness" />
            <span className="nav-label">Fitness</span>
          </div>
        </button>
      </div>
      <div className="nav-group">
        <button className="nav-button" onClick={() => { setActive("cooking"); navigate("/cooking"); }}>
          <div className={`nav-content ${active === "cooking" ? "active" : ""}`}>
            <img src={cooking} className="nav-icon" alt="Cooking" />
            <span className="nav-label">Cooking</span>
          </div>
        </button>
      </div>
      <div className="nav-group">
        <button className="nav-button" onClick={() => { setActive("beauty"); navigate("/beauty"); }}>
          <div className={`nav-content ${active === "beauty" ? "active" : ""}`}>
            <img src={beauty} className="nav-icon" alt="Beauty" />
            <span className="nav-label">Beauty</span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
