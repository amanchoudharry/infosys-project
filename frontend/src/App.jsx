import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import Professional from './pages/professional/Professional';
import UserDashboard from './pages/users/UserDashboard';
import Emergency from './pages/users/Emergency';
import About from './pages/users/About';
import SelfAssessment from './pages/users/SelfAssessment';
import UserProfessional from './pages/users/UserProfessional';
import DepressionTest from './components/Assessment/DepressionTest';
import EatingDisorderTest from './components/Assessment/EatingDisorderTest';
import AnxietyTest from './components/Assessment/AnxietyTest';
import PostpartumDepressionTest from './components/Assessment/PostpartumDepressionTest';
import ADHDTest from './components/Assessment/ADHDTest';
import BipolarTest from './components/Assessment/BipolarTest';

const App = () => {
  const username = sessionStorage.getItem('username');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard/user' element={ username ? <UserDashboard/> : <Login/>}/>
        <Route path='/dashboard/professional' element={ username ?  <Professional/> : <Login/>}/>
        <Route path='/user/emergency' element={username ? <Emergency/> : <Login/>} />
        <Route path='/user/about' element={username ? <About/> : <Login/>}/>
        <Route path='/user/assessment' element={username ? <SelfAssessment/> : <Login/>}/>
        <Route path='/user/professional' element={username ? <UserProfessional/> : <Login/>}/>
        <Route path='/user/assessment/test1' element={<DepressionTest/>}/>
        <Route path='/user/assessment/test2' element={<AnxietyTest/>}/>
        <Route path='/user/assessment/test3' element={<ADHDTest/>}/>
        <Route path='/user/assessment/test4' element={<BipolarTest/>}/>
        <Route path='/user/assessment/test7' element={<EatingDisorderTest/>}/>
        <Route path='/user/assessment/test8' element={<PostpartumDepressionTest/>}/>
      </Routes>
      <ToastContainer/>
    </Router>
  );
};

export default App;
