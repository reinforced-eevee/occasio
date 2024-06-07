import React, { useState, useEffect } from 'react';
import '../styling/Questionnaire.css';
import { useNavigate } from 'react-router';
import { Rings } from 'react-loader-spinner';
import HomeNavbar from './HomeNavbar';

const Questionnaire = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    days: '',
    type: '',
    guest_size: '',
    age_range: '',
    location: '',
    theme: '',
    formality: '',
    budget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set isSubmitting to true when form submission starts
    console.log('Form Data Submitted:', formData);
    try {
      const response = await fetch('http://localhost:3000/openai/createEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      const result = await response.json();
      console.log('Itinerary submitted:', result);
      navigate('/home');
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
    setIsSubmitting(false); // Set isSubmitting to false after form submission is complete
  };

  return (
    <div>
      <HomeNavbar />
      <div className="questionnaire-background">
        <div className="questionaire-container">
          {isSubmitting && (
            <div className="loader-container">
              <Rings
                visible={true}
                height="150"
                width="150"
                color="#4fa94d"
                ariaLabel="rings-loading"
              />
            </div>
          )}
          <h2>Create new event</h2>
          <form onSubmit={handleSubmit}>
            <label>Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

            <label>Number of Days</label>
            <input
              type="number"
              name="days"
              value={formData.days}
              onChange={handleChange}
            />

            <label>Type*</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />

            <label>Number of guests*</label>
            <input
              type="number"
              name="guest_size"
              value={formData.guest_size}
              onChange={handleChange}
            />

            <label>Age Range</label>
            <input
              type="string"
              name="age_range"
              value={formData.age_range}
              onChange={handleChange}
            />

            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

            <label>Theme</label>
            <input
              type="text"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
            />

            <label>Attire</label>
            <input
              type="text"
              name="formality"
              value={formData.formality}
              onChange={handleChange}
            />

            <label>Budget</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            />

            <div>
              <i>*Fields marked as * are required</i>
            </div>
            <button
              type="submit"
              disabled={
                !formData.name || !formData.type || !formData.guest_size
              }
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
