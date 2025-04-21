import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import '../../style/login.css'; // Import your CSS file here
import login_bg from "../../assets/login_bg.svg"; // Import your background image here
import signup_bg from "../../assets/signup_bg.svg"; // Import your signup background image here

const LoginPage = () => {
  const [signUpMode, setSignUpMode] = useState(false);

  return (
    <div className={`container ${signUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <LoginForm />
          <SignupForm />
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Sign up now and join the community!</p>
            <button className="btn transparent" onClick={() => setSignUpMode(true)}>
              Sign up
            </button>
          </div>
          <img src={login_bg} className="image" alt="sign-up" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Already have an account? Log in here.</p>
            <button className="btn transparent" onClick={() => setSignUpMode(false)}>
              Sign in
            </button>
          </div>
          <img src={signup_bg} className="image" alt="sign-in" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
