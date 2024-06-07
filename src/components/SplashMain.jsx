import React from 'react';
import '../styling/SplashMain.css'
import NineSVG from '../assets/9.svg'
import SevenSVG from '../assets/7.svg'
import EightSVG from '../assets/8.svg'

const SplashMain = () => {
  return (
    <div className="header">
      <img src={NineSVG} alt='9' className='overlay-svg nine-svg' />
      <img src={SevenSVG} alt='7' className='overlay-svg seven-svg' />
      <img src={EightSVG} alt='8' className='overlay-svg eight-svg' />
      <div className='title'>
        <h1 className='top-text'>Streamline</h1>
        <h1>your Event Planning</h1>
      </div>
      <div className="text-1">
        <h2>Get Your Time Back</h2>
      </div>
      <div className='text-2'>
        <h2>and Let the Celebrations Begin</h2>
      </div>
    </div>
  )
}
export default SplashMain