import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear cookies
    Cookies.remove('authToken');
    Cookies.remove('role');

    // Show toast message
    toast.success('Logged out successfully!');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the User Dashboard</h1>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 ease-in-out"
      >
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;
