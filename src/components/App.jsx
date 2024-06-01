import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import Signup from './Signup';
import Login from './Login';

const App = () => (
  <div id="app">
    <Routes>
      <Route path="/" />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </div>
);

export default App;