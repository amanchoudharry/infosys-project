import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import EmergencyHeader from './EmergencyHeader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const foundUser = sessionStorage.getItem('userFound');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const validatePasswordFormat = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if(!newPassword || !confirmPassword){
      setError('Password cannot be empty');
      return;
    }
    if (!validatePasswordFormat(newPassword)) {
      setError('Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/users/change-password`, {
        username: foundUser,
        newPassword,
      });

      if (response.status === 200) {
        navigate('/login');
        toast.success('Password updated successfully!');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Current password is incorrect.');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='relative'>
      <EmergencyHeader />
      <div className="min-h-screen flex items-center justify-center bg-transparent absolute top-0 w-full">
        <div className="bg-gray-900 p-8 rounded-3xl bg-opacity-80 shadow-xl w-full max-w-md transform transition-transform hover:scale-105 hover:shadow-2xl ease-in-out duration-300">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Change Your Password</h2>
          <form onSubmit={handleChangePassword} className="flex flex-col gap-3">
            <div>
              <label className="block text-sm font-bold text-white">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-white">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 font-bold text-sm">{error}</p>}
            <div className="flex justify-center mt-6">
              <button type="submit" className="px-8 py-3 bg-green-600 font-bold text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out transform hover:scale-105">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
