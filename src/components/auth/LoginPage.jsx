import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "../../style/login.css";
import login_bg from "../../assets/login_bg.svg";
import signup_bg from "../../assets/signup_bg.svg";
import "../../style/splashscreen.css";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [signUpMode, setSignUpMode] = useState(false); // ✅ moved up

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const sentence = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  if (showSplash) {
    return (
      <motion.div
        className="splash-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="title-container">
          <motion.h1
            variants={sentence}
            initial="hidden"
            animate="visible"
            className="splash-text"
          >
            {"Welcome to FIT".split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.h1
            variants={sentence}
            initial="hidden"
            animate="visible"
            className="splash-text world"
          >
            {"World".split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </motion.div>
    );
  }

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
