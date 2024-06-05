import React from 'react';
import HomeNavbar from './HomeNavbar';
import Questionaire from './Questionnaire';
import EventsSidebar from './EventsSidebar';
import '../styling/Home.css';
function Home() {
  return (
    <div>
      <HomeNavbar />
      <EventsSidebar />
    </div>
  );
}

export default Home;
