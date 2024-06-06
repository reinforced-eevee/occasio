import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/SplashFooter.css';
import CurlSVG from '../assets/curl.svg';

function SplashFooter () {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  }

  return (
    <div className='footer-container'>
      <div className="main-container">
        <img src={CurlSVG} alt="" className="overlay-svg" />
        <div className="text-container">
          <div className="main-text">
            Plan Your Event<br />
            in a Snap, It's Free!
          </div>
          <div className="sub-text">
            Start Now and Experience Seamless, Stress-Free Planning
          </div>
        </div>
        <div>
          <button className="started-button" onClick={handleClick}>Get Started</button>
        </div>
      </div>
      <div className="footer">
        <div className="bottom">
          <div className="logo-container">
            <div className="logo-text">
              Occasio
            </div>
          </div>
          <div className="copyright">
          © 2024 Occasio. All Rights Reserved. 
          </div>
        </div>
      </div>
    </div>
  )
}

export default SplashFooter