import React from 'react';
import '../styling/HomeNavbar.css';

function HomeNavbar(props) {
  return (
    <nav className='home-navbar'>
      <h2><a href="/home">Some logo</a></h2>
      <h2><a href="/questionaire">Create Event</a></h2>
      <h2><a href="/action/logout">Logout</a></h2>
    </nav>
  );
}

export default HomeNavbar;
