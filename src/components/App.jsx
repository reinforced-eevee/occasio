import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home';
import Questionaire from './Questionaire';

function App() {
  return (
    <div>
      <Router>
        <Routes>
         <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home/*' element={<Home />} />
          <Route path='/questionaire' element={<Questionaire />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
