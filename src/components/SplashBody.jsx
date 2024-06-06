import React from 'react';
import '../styling/SplashBody.css';
import breakDance from '../assets/breakdance.svg';
import computer from '../assets/computer.svg';
import lift from '../assets/lift.svg';

const SplashBody = () => {
  return (
    <div>
    <div className='body'>
      <div className='column'>
        <div className='column-text'>
          <h3>Effortless Planning:
              Simplify Your Event 
              Planning Process</h3>
        </div>
        <div className='column-text-2'>
          <p>Ocassio creates detailed itineraries, shopping lists, and venue options based on your input. Plan your entire event in minutes, hassle-free.</p>
        </div>
      </div>
      <img src={breakDance} alt='breakdancer' />
    </div>
    <div className='body'>
      <img src={computer} alt='breakdancer' />
      <div className='column'>
        <div className='column-text'>
          <h3>AI-Powered Precision:
              Smart Suggestions <br/>
              Tailored to Your Needs</h3>
        </div>
        <div className='column-text-2'>
          <p>Harness the power of AI to receive personalized recommendations for venues, playlists, and more. Let Ocassio handle the details while you focus on the big picture.</p>
        </div>
      </div>
    </div>
    <div className='body'>
      <div className='column'>
        <div className='column-text'>
          <h3>Budget-Friendly Insights:
              Know Your Costs Upfront</h3>
        </div>
        <div className='column-text-2'>
          <p>Ocassio provides estimated costs for your event, helping you stay within budget. Turn your ideas into actionable plans with financial clarity and confidence.</p>
        </div>
      </div>
      <img src={lift} alt='breakdancer' />
    </div>
    </div>
  )
}
export default SplashBody