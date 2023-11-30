import React from 'react';
import { Fragment } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Survey from './components/Survey/Survey';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className='App'><SignUp /><Login /></div>} />
        <Route path="/UserSurvey" element={<Survey />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
