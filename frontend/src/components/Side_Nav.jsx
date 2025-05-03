import React, { useState } from "react";
import "../style/sidenav.css"; // Ensure this CSS file exists and is styled appropriately
import { FaHome, FaChartBar, FaUserAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-nav ${isOpen ? "open" : "closed"}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <div className="nav-header">
        <h2 className="logo">{isOpen ? "Healthify" : "H"}</h2>
      </div>
      <ul className="nav-links">
        <li onClick={() => navigate("/home")}>
          <FaHome className="icon" />
          {isOpen && <span>Home</span>}
        </li>
        <li onClick={() => navigate("/insights")}>
          <FaChartBar className="icon" />
          {isOpen && <span>Insights</span>}
        </li>
        <li onClick={() => navigate("/home")}>
          <FaUserAlt className="icon" />
          {isOpen && <span>Home</span>}
        </li>
        <li onClick={() => navigate("/auth")}>
          <FaSignOutAlt className="icon" />
          {isOpen && <span>Logout</span>}
        </li>
      </ul>
    </div>
  );
};

export default SideNav;