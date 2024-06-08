import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home';
import Questionnaire from './Questionnaire';
import LandingPage from './LandingPage';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home/*' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/questionnaire' element={
            <ProtectedRoute>
              <Questionnaire />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
