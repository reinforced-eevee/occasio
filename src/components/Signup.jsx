import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/SplashMain.css'
import NineSVG from '../assets/9.svg'
import SevenSVG from '../assets/7.svg'
import EightSVG from '../assets/8.svg'

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [duplicate, setDuplicate] = useState(false);

  const handleDataChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: userData.email,
      password: userData.password,
    };
    fetch('/action/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((bool) => {
        if (bool) {
          navigate('/home/home/itinerary');
        }
      })
      .catch((err) => console.log('App: create user error ', err));
  };

  useEffect(() => {
    if (userData.email) {
      fetch(`/action/checkDuplicate/${userData.email}`)
        .then((res) => res.json())
        .then((bool) => setDuplicate(bool))
        .catch((err) => console.log('App: check email duplicate error: ', err));
    } else {
      setDuplicate(false);
    }
  }, [userData.email]);

  return (
    <div className='page-container'>
      <img src={NineSVG} alt='9' className='overlay-svg nine-svg' />
      <img src={SevenSVG} alt='7' className='overlay-svg seven-svg' />
      <img src={EightSVG} alt='8' className='overlay-svg eight-svg' />
      <div className='login-center'>
        <h2>Sign Up Page</h2>
        <form onSubmit={handleSubmit} className='login-form'>
          <p>Email</p>
          <input
            type='text'
            name='email'
            value={userData.email}
            onChange={handleDataChange}
            required
          />

          <p>Password</p>
          <input
            type='password'
            name='password'
            value={userData.password}
            onChange={handleDataChange}
            required
          />
          <div>
            <button
              type='submit'
              className='btn login-btn'
              disabled={!userData.email || !userData.password}
            >
              Sign up
            </button>
          </div>
        </form>
        {duplicate && (
          <div style={{ color: 'red', fontSize: '0.8em' }}>
            User already exists. Please log in instead.
          </div>
        )}
        <p className='signup-footer'>
          Already a user? <a href='/login'>Log in</a>
          <br></br>
          <a href="/">Back to home</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
