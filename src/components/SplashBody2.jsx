import React from 'react';
import '../styling/SplashBody2.css';
import vector from '../assets/Vector.svg';
import testimonial from '../assets/testimonial.jpeg';

function SplashBody2 () {

  return (
    <div className="testimonial-container">
      <div className="image" style={{ backgroundImage: `url(${vector})` }}>
        <img src={testimonial} className="testimonial-photo" />
      </div>
      <div className="testimonial">
        <div className="testimonial-header">Testimonial</div>
        <div className="testimonial-text">I used to hate planning events until I found Occasio and now I find the process even more enjoyable than getting a refund, yay!"</div>
        <div className="testimonial-giver">Daniel Sin SWE</div>
      </div>
    </div>
  )
}

export default SplashBody2