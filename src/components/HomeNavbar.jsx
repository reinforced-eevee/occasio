import React from 'react';
import '../styling/HomeNavbar.css';

function HomeNavbar(props) {
  return (
    <nav className="home-navBar">
      <h2>
        <a href="/home" className="logo">
          Occasio
        </a>
      </h2>
      <button type="button" className="home-btns">
        Create Event
      </button>
      <button type="button" className="home-btns">
        Log Out
      </button>
    </nav>
  );
}

export default HomeNavbar;
