import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/Login.css';
import '../styling/SplashMain.css'
import NineSVG from '../assets/9.svg'
import SevenSVG from '../assets/7.svg'
import EightSVG from '../assets/8.svg'

const Login = () => {
  const navigate = useNavigate();
  const [correctCredential, setCorrectCredential] = useState(true);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

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
    fetch('/action/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((bool) => {
      setCorrectCredential(bool);
      if (bool) {
        navigate('/home/home/itinerary');
      }
    })
    .catch((err) => console.log('App: log in error ', err));
  };

  return (
    <div className='page-container'>
      <img src={NineSVG} alt='9' className='overlay-svg nine-svg' />
      <img src={SevenSVG} alt='7' className='overlay-svg seven-svg' />
      <img src={EightSVG} alt='8' className='overlay-svg eight-svg' />
      <div className='login-center'>
        <h2>Log in</h2>
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
              Sign in
            </button>
          </div>
        </form>
        {!correctCredential && <div className="error">Incorrect username or password.</div>}

        <p className='signup-footer'>
          Not a user yet? <a href='/signup'>Sign up</a>
          <br></br>
          <a href="/">Back to home</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
