import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SplashMain from './SplashMain.jsx';
import SplashFooter from './SplashFooter.jsx';
import SplashBody from './SplashBody.jsx';

import '../styling/LandingPage.css';

function LandingPage () {
  return (
    <div className='landing-page'>
      <SplashMain />
      <SplashBody />
      <SplashFooter />
    </div>
  )
}

export default LandingPage