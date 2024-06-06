import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home';
import Questionnaire from './Questionnaire';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/questionnaire' element={<Questionnaire />} />
      </Routes>
    </div>
  );
}

export default App;
