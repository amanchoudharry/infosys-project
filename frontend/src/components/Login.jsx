import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import EmergencyHeader from './EmergencyHeader';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};
    if (!credentials.username.trim()) {
      validationErrors.username = 'Username is required';
    }
    if (!credentials.password.trim()) {
      validationErrors.password = 'Password is required';
    }
    return validationErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/login', credentials, { withCredentials: true });
      const { id, username, role } = response.data;

      // Store user ID and username in sessionStorage
      sessionStorage.setItem('userId', id);
      sessionStorage.setItem('username', username);

      if (role === 'user') {
        navigate('/dashboard/user');
        window.location.reload();
      } else if (role === 'professional') {
        navigate('/dashboard/professional');
        window.location.reload();
      }
    } catch (error) {
      toast.error('Invalid credentials or server error');
      console.log(error);
    }
  };

  return (
    <div>
      <EmergencyHeader />
      <div className="min-h-screen flex items-center justify-center bg-transparent absolute top-0 w-full">
        <div className="bg-gray-900 p-8 rounded-3xl bg-opacity-80 shadow-xl w-full max-w-md transform transition-transform hover:scale-105 hover:shadow-2xl ease-in-out duration-300">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Login</h2>
          <h1 className="text-white text-center text-sm mb-5 -mt-4">
            Click here to Register{' '}
            <Link to={'/register'}>
              <span className="text-[#62FFB4]">Register</span>
            </Link>
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-white">Username</label>
              <input
                className="w-full px-4 py-3 border text-white bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                type="text"
                value={credentials.username}
                onChange={(e) => {
                  setCredentials({ ...credentials, username: e.target.value });
                  setErrors({ ...errors, username: '' });
                }}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-white">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 text-white border bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={credentials.password}
                onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value });
                  setErrors({ ...errors, password: '' });
                }}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <Link to={'/finduser'}>
              <button className="text-green-400 font-bold hover:underline mt-2">Forget Password</button>
            </Link>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out transform hover:scale-105"
              >
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
