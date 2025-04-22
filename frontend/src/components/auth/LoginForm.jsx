import React from "react";
import SocialIcons from "../../assets/SocialIcons";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submit
    // You can add authentication logic here if needed
    navigate("/home");
  };

  return (
    <form className="sign-in-form" onSubmit={handleLogin}>
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input type="text" placeholder="Username" />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Password" />
      </div>
      <input type="submit" value="Login" className="btn solid" />
      <p className="social-text">Or Sign in with social platforms</p>
      <div className="social-media">
        <SocialIcons />
      </div>
    </form>
  );
};

export default LoginForm;
