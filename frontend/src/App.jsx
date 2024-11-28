import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Register from './components/Register';
import Login from './components/Login';

import { ToastContainer } from 'react-toastify';
import AdminDashboard from './pages/admin/AdminDashboard';
import Professional from './pages/professional/Professional';
import UserDashboard from './pages/users/UserDashboard';
import Emergency from './pages/users/Emergency';
import About from './pages/users/About';

const App = () => {
  const isAuthenticated = !!Cookies.get('authToken');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard/admin' element={<AdminDashboard/>}/>
        <Route path='/dashboard/user' element={<UserDashboard/>}/>
        <Route path='/dashboard/professional' element={<Professional/>}/>
        <Route path='/user/emergency' element={<Emergency/>}/>
        <Route path='/user/about' element={<About/>}/>
      </Routes>
      <ToastContainer/>
    </Router>
  );
};

export default App;
