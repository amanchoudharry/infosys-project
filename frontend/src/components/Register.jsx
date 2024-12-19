import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import EmergencyHeader from './EmergencyHeader';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};

    // Validate username
    if (!username.trim()) {
      validationErrors.username = 'Username is required.';
    } else if (username.length < 3) {
      validationErrors.username = 'Username must be at least 3 characters long.';
    }

    // Validate password
    if (!password.trim()) {
      validationErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long.';
    }

    // Validate role
    if (!role) {
      validationErrors.role = 'Role selection is required.';
    }

    return validationErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate form inputs
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', {
        username,
        password,
        role,
      });

      if (response.status === 200) {
        toast.success('Registered Successfully!');
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data); // Display backend error message (e.g., "User already exists!")
      } else {
        toast.error('Registration failed! Please try again.');
      }
    }
  };

  return (
    <div className="relative">
      <EmergencyHeader />
      <div className="min-h-screen flex items-center justify-center bg-transparent absolute top-0 w-full">
        <div className="bg-gray-900 p-8 rounded-3xl bg-opacity-80 shadow-xl w-full max-w-md transform transition-transform hover:scale-105 hover:shadow-2xl ease-in-out duration-300">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Get Started</h2>
          <h1 className="text-white text-center text-sm mb-5 -mt-4">
            Already have an account?{' '}
            <Link to={'/login'}>
              <span className="text-[#62FFB4]">Login</span>
            </Link>
          </h1>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-white">Username</label>
              <input
                type="text"
                className="w-full px-4 py-3 border bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors({ ...errors, username: '' });
                }}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-white">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: '' });
                }}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-white">Role</label>
              <select
                className="w-full px-4 py-3 border bg-transparent font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setErrors({ ...errors, role: '' });
                }}
              >
                <option className="text-black" value="user">
                  User
                </option>
                <option className="text-black" value="professional">
                  Professional
                </option>
              </select>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-8 py-3 bg-green-600 font-bold text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out transform hover:scale-105"
              >
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
