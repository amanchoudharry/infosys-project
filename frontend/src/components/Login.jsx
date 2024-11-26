import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import EmergencyHeader from './EmergencyHeader';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        username,
        password
      });

      // Store role in cookies
      const { role } = response.data;
      Cookies.set('role', role, { expires: 7 }); // Expires in 7 days
      if (response) {
        toast.success('Login successful!');
        navigate(`/dashboard/${role}`); // Redirect to dashboard based on role
        console.log(Cookies.get('role'));
      }
    } catch (error) {
      toast.error('Invalid credentials!');
    }
  };

  return (
    <div>
      <EmergencyHeader/>
      <div className="min-h-screen flex items-center justify-center bg-transparent absolute top-0 w-full">
        <div className="bg-gray-500 bg-opacity-55  p-8 rounded-lg shadow-xl w-full max-w-md transform transition-transform hover:scale-105 hover:shadow-2xl ease-in-out duration-300">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-white">Username</label>
              <input
                type="text"
                className="w-full px-4 py-3 border text-white bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-white">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 text-white border bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center mt-6">
              <button type="submit" className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out transform hover:scale-105">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
