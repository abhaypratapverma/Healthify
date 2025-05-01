import React, { useState } from "react";
import SocialIcons from "../../assets/SocialIcons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/api/auth/signup`, formData);
      if (response.status === 201) {
        setError(""); // Clear any previous errors
        navigate("/"); // Redirect to login page
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSignup}>
      <h2 className="title">Sign up</h2>
      {error && <p className="error-text">{error}</p>}
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <input type="submit" className="btn" value="Sign up" />
      <p className="social-text">Or Sign up with social platforms</p>
      <div className="social-media">
        <SocialIcons />
      </div>
    </form>
  );
};

export default SignupForm;
