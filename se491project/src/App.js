import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import './App.css';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Survey from './components/Survey/Survey';
import Account from './components/Account/Account';
import Doctor from './components/Doctor/Doctor';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className='App'><SignUp /><Login /></div>} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/account" element={<Account />} />
        <Route path="/doctor" element={<Doctor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
