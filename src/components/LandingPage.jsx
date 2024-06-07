import React from 'react';
import LandingNavBar from './LandingNavBar.jsx';
import SplashMain from './SplashMain.jsx';
import SplashFooter from './SplashFooter.jsx';
import SplashBody from './SplashBody.jsx';
import SplashBody2 from './SplashBody2.jsx';
import RowMint from './RowMint.jsx';

import '../styling/LandingPage.css';

function LandingPage () {
  return (
    <div className='landing-page'>
      <LandingNavBar />
      <SplashMain />
      <RowMint />
      <SplashBody />
      <SplashBody2 />
      <SplashFooter />
    </div>
  )
}

export default LandingPage