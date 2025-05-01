import React, { useState } from "react";
import "../style/sidenav.css"; // Ensure this CSS file exists and is styled appropriately
import { FaHome, FaChartBar, FaUserAlt, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);

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
        <li>
          <FaHome className="icon" />
          {isOpen && <span>Home
            </span>}
        </li>
        <li>
          <FaChartBar className="icon" />
          {isOpen && <span>Insights</span>}
        </li>
        <li>
          <FaUserAlt className="icon" />
          {isOpen && <span>Profile</span>}
        </li>
        <li>
          <FaCog className="icon" />
          {isOpen && <span>Settings</span>}
        </li>
        <li>
          <FaSignOutAlt className="icon" />
          {isOpen && <span>Logout</span>}
        </li>
      </ul>
    </div>
  );
};

export default SideNav;