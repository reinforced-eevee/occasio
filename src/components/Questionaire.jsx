import React from 'react';
import { useState } from 'react';

function Questionaire() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    alert(`Submitted value: ${inputValue}`);
  };

  return (
    <div className='create-event-container'>
      <h2>Create a new event</h2>
      <div className='inline-input-container'>
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          placeholder='Enter keywords'
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Questionaire;
