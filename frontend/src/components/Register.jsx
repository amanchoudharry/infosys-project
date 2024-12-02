import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import EmergencyHeader from './EmergencyHeader';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/register', {
        username,
        password,
        role
      });

      // Store the role in cookies for future access
      Cookies.set('role', role, { expires: 7 }); // Expires in 7 days

      if (response) {
        toast.success("Registered Successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error('Registration failed!');
    }
  };

  return (
    <div className='relative'>
      <EmergencyHeader/>
      <div className="min-h-screen flex items-center justify-center bg-transparent absolute top-0 w-full">
        <div className="bg-gray-500 bg-opacity-55 p-8 rounded-lg shadow-xl w-full max-w-md transform transition-transform hover:scale-105 hover:shadow-2xl ease-in-out duration-300">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Get Started</h2>
          <h1 className='text-white text-center text-sm mb-5 -mt-4'>Already have an account? <Link to={'/login'}><span className='text-[#62FFB4]'>Login</span></Link> </h1>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-white">Username</label>
              <input
                type="text"
                className="w-full px-4 py-3 border bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-white">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-white">Role</label>
              <select
                className="w-full px-4 py-3 border bg-transparent font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option className='text-black' value="user">User</option>
                <option className='text-black' value="admin">Admin</option>
                <option className='text-black' value="professional">Professional</option>
              </select>
            </div>
            <div className="flex justify-center mt-6">
              <button type="submit" className="px-8 py-3 bg-green-600 font-bold text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out transform hover:scale-105">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
