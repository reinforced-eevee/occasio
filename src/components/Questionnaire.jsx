import React, { useState } from 'react';
import '../styling/Questionnaire.css';

const Questionnaire = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    type: '',
    guest_size: '',
    age_range: '',
    location: '',
    theme: '',
    formality: '',
    budget: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Add logic for submitting form data to the database and redirecting to the dashboard
  };

  return (
    <div className='questionaire-container'>
      <h2>Create new event</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Date</label>
        <input
          type='date'
          name='date'
          value={formData.date}
          onChange={handleChange}
        />

        <label>Type</label>
        <input
          type='text'
          name='type'
          value={formData.type}
          onChange={handleChange}
        />

        <label>Number of guests</label>
        <input
          type='number'
          name='guest_size'
          value={formData.guest_size}
          onChange={handleChange}
        />

        <label>Age Range</label>
        <input
          type='number'
          name='age_range'
          value={formData.age_range}
          onChange={handleChange}
        />

        <label>Location</label>
        <input
          type='text'
          name='location'
          value={formData.location}
          onChange={handleChange}
        />

        <label>Theme</label>
        <input
          type='text'
          name='theme'
          value={formData.theme}
          onChange={handleChange}
        />

        <label>Attire</label>
        <input
          type='text'
          name='formality'
          value={formData.formality}
          onChange={handleChange}
        />

        <label>Budget</label>
        <input
          type='text'
          name='budget'
          value={formData.budget}
          onChange={handleChange}
        />

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Questionnaire;
