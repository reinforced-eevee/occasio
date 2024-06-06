import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/LandingNavBar.css';

function LandingNavBar () {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  }

  const handleLoginClick = () => {
    navigate("/login");
  }

  return (
    <div className="navBar">
      {/* <div className="logo-contain"> */}
        <div className="logo">
          Occasio
        </div>
      {/* </div> */}
      <div className="navButtons">
        <button className="login" onClick={handleLoginClick}> Log In </button>
        <button className="signup" onClick={handleSignupClick}> Sign Up</button>
      </div>
    </div>
  )
}

export default LandingNavBar