import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import './App.css';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Survey from './components/Survey/Survey';
import Account from './components/Account/Account'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className='App'><SignUp /><Login /></div>} />
        <Route path="/UserSurvey" element={<Survey />} />
        <Route path="/Account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
