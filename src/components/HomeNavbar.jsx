import React from 'react';
import '../styling/HomeNavbar.css';
import { useNavigate } from 'react-router-dom';

function HomeNavbar(props) {
  const navigate = useNavigate();

  const handleQuestionnaireDirect = () => {
    navigate('/questionnaire');
  };

  return (
    <nav className='home-navBar'>
      <h2>
        <a href='home/home/itinerary' className='logo'>
          Occasio
        </a>
      </h2>
      <div className='navBar-right'>
        <button
          type='button'
          className='home-btns'
          onClick={handleQuestionnaireDirect}
        >
          Create Event
        </button>
        <a href='/action/logout'>
          <button type='button' className='home-btns'>
            Log Out
          </button>
        </a>
      </div>
    </nav>
  );
}

export default HomeNavbar;
