import React from 'react';
import '../styling/RowMint.css';
import celebration from '../assets/celebration.svg';

const RowMint = () => {
  return (
    <div className='row-mint'>
      <div className='content'>
        <img src={celebration} alt='celebration' />
        <div className='content-text'>
          <p>Start planning, totally free!</p>
        </div>
      </div>
    </div>
  )
}
export default RowMint