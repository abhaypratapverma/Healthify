import React from "react";
import SocialIcons from "../../assets/SocialIcons";
import { useNavigate } from "react-router-dom";
const SignupForm = () =>{
  const navigate = useNavigate();
  const handleSignup = (e) => {
    
    // You can add signup logic here if needed
    navigate("/auth"); // Redirect to home page after signup
  }
  return (
    <form className="sign-up-form">
      <h2 className="title">Sign up</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input type="text" placeholder="Username" />
      </div>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input type="email" placeholder="Email" />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Password" />
      </div>
      <input onClick={handleSignup} type="submit" className="btn" value="Sign up" />
      <p className="social-text">Or Sign up with social platforms</p>
      <div className="social-media">
        <SocialIcons />
      </div>
    </form>
  );
}

export default SignupForm;
