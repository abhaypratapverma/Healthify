import React, { useState, useEffect } from "react";
import axios from "axios";
import image40 from "./assets/homeImages/image40.png";
import image28 from "./assets/homeImages/image 28.png";
import fitness from "./assets/homeImages/fitness.svg";
import Group2 from "./assets/homeImages/Group 2.svg";
import Group52 from "./assets/homeImages/Group 52.svg";
import image35 from "./assets/homeImages/image 35.png";
import Group53 from "./assets/homeImages/Group 53.svg";
import Group54 from "./assets/homeImages/Group 54.svg";
import Group62 from "./assets/homeImages/Group 62.svg";
import Group45 from "./assets/homeImages/Group 45.png";
import Group43 from "./assets/homeImages/Group 43.svg";
import entertainment from "./assets/homeImages/entertainment.svg";
import Group from "./assets/homeImages/Group.svg";
import imageMandla from "./assets/homeImages/image-mandala.svg";
import beauty from "./assets/homeImages/beauty.svg";
import cooking from "./assets/homeImages/cooking.svg";
import { useNavigate } from "react-router-dom";
import "./style/home.css";
import BottomNav from "./common/nav/BottomNav";
import Protien from "./assets/Protien.webp";

const Home = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [banner, setBanner] = useState(true);
  const [userData, setUserData] = useState(null); // State to store user data
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch user profile from the backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        setUserData(response.data); // Update state with user data
      } catch (error) {
        console.error("Error fetching user profile:", error.response?.data?.message || error.message);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="home-wrapper">
      {showNotification && (
        <div className="notification-banner">
          Congratulations! Your account has been created.
        </div>
      )}

      <div className="welcome-section">
        <h2 className="welcome-heading">
          Hi, {userData ? userData.name : "Guest"} 👋
        </h2>
        {banner && (
          <div className="banner-box">
            <div className="banner-image">
              <img src={image40} alt="Water Goal" className="banner-img" />
            </div>
            <div className="banner-text">
              <p className="banner-question">Did you meet your water goal today?</p>
              <a href="#" className="banner-link">Check now</a>
            </div>
            <button className="banner-close" onClick={() => setBanner(false)}>✖</button>
          </div>
        )}
      </div>

      <div className="latest-activity-section">
        <h3 className="section-heading">Latest Activity</h3>
        <div className="activity-list">
          <div
            className="activity-item"
            onClick={() => navigate("/meditation")} // Navigate to Meditation
          >
            <div className="activity-icon-box">
              <img src={Group53} className="activity-icon" alt="Meditation Icon" />
            </div>
            <span className="activity-label">Meditation</span>
          </div>
          <div
            className="activity-item"
            onClick={() => navigate("/nutrition")} // Navigate to Yoga (replace with actual path if different)
          >
            <div className="activity-icon-box">
              <img src={Group2} className="activity-icon" alt="Yoga Icon" />
            </div>
            <span className="activity-label">nutrition</span>
          </div>
          <div
            className="activity-item"
            onClick={() => navigate("/bmi")} // Navigate to BMI
          >
            <div className="activity-icon-box">
              <img src={Group54} className="activity-icon" alt="BMI Icon" />
            </div>
            <span className="activity-label">Bmi</span>
          </div>
        </div>
      </div>

      <div className="trending-section">
        <h3 className="section-heading">Trending today</h3>
        <div className="trending-banner">
          <div className="trending-img-container">
            <img src={imageMandla} className="trending-bg-img" alt="Mandala" />
            <img src={image28} className="trending-fg-img" alt="Yoga" />
          </div>
          <div className="trending-text">
            <h4 className="trending-title">Meditation <br />for stress free life</h4>
            <button
              className="trending-button"
              onClick={() => navigate("/meditation")} // Navigate to /meditation
            >
              Join now
            </button>
          </div>
        </div>
      </div>

      <div className="explore-section">
        <div className="explore-container">
          <h3 className="section-heading">Explore</h3>
          <div className="explore-grid">

            <div className="explore-item" onClick={() => navigate("/activity")}>
              <div className="explore-icon-box">
                <img src={fitness} className="explore-icon" alt="ActivityLogger" />
              </div>
              <span className="explore-label">ActivityLogger</span>
            </div>

            <div className="explore-item" onClick={() => navigate("/bmi")}>
              <div className="explore-icon-box">
                <img src={beauty} className="explore-icon" alt="Fitness" />
              </div>
              <span className="explore-label">Bmi</span>
            </div>


            
            <div className="explore-item" onClick={() => navigate("/fasting")}>
              <div className="explore-icon-box">
                <img src={Group45} className="explore-icon" alt="FastingTracker" />
              </div>
              <span className="explore-label">FastingTracker</span>
            </div>
            


            {/* Repeat explore-item */}
            <div className="explore-item" onClick={() => navigate("/community")}>
              <div className="explore-icon-box">
                <img src={Group43} className="explore-icon" alt="Community" />
              </div>
              <span className="explore-label">Community</span>
            </div>
            <div className="explore-item" onClick={() => navigate("/insights")}>
              <div className="explore-icon-box">
                <img src={entertainment} className="explore-icon" alt="Insights" />
              </div>
              <span className="explore-label">Insights</span>
            </div>
            {/*  */}
            <div className="explore-item" onClick={() => navigate("/meditation")}>
              <div className="explore-icon-box">
                <img src={cooking} className="explore-icon" alt="Fitness" />
              </div>
              <span className="explore-label">Meditation</span>
            </div>

            <div className="explore-item" onClick={() => navigate("/nutrition")}>
              <div className="explore-icon-box">
                <img src={cooking} className="explore-icon" alt="nutrition" />
              </div>
              <span className="explore-label">Nutrition</span>
            </div>
            <div className="explore-item" onClick={() => navigate("/consultancy")}>
              <div className="explore-icon-box">
                <img src={cooking} className="explore-icon" alt="nutrition" />
              </div>
              <span className="explore-label">Consultancy</span>
            </div>

          </div>
        </div>
      </div>

      <div className="ad-section">
        <div className="ad-banner">
          <img src={Protien} className="ad-image" alt="Ad" />
          <div>
            <h3 className="ad-heading">Diwali</h3>
            <span className="ad-subheading">
              <img src={Group} className="ad-icon" alt="Icon" />
              recipe contest
              <img src={Group} className="ad-icon" alt="Icon" />
            </span>
            <p className="ad-description">Win Gold, Silver, Bike &gt;</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;