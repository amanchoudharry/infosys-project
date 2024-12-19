import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import EmergencyHeader from './EmergencyHeader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FindByUsername = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate username
        if (!username.trim()) {
            setError('Username is required');
            return;
        }

        setError(''); // Clear error if validation passes

        try {
            const response = await axios.get(`http://localhost:8080/api/users/user/${username}`);
            if (response.status === 200) {
                toast.success('User exists!');
                sessionStorage.setItem('userFound', username);
                navigate('/forgetpassword');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error('User not found!');
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
                    <h2 className="text-3xl font-bold text-center text-white mb-6">Find Your Account to Change Password</h2>
                    <form onSubmit={handleRegister} className="">
                        <div>
                            <label className="block text-sm font-bold text-white">Enter Your Username</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-500 font-bold text-sm mt-2">{error}</p>}
                        <div className="flex justify-center mt-6">
                            <button type="submit" className="px-8 py-3 bg-green-600 font-bold text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out transform hover:scale-105">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FindByUsername;
