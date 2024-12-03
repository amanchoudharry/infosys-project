import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Logo from '../../assets/infosys-main.png';
import Arrow from '../../assets/icons/right-arrow.png';
import Appointment from '../../assets/appointment.png';
import Footer from '../../components/Footer';
import ProfessionalSection from '../../components/ProfessionalSection';

const BASE_URL = 'http://localhost:8080';

const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const UserProfessional = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('username');

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        time: '',
        message: '',
    });

    const navItems = [
        { name: 'Home', path: '/dashboard/user' },
        { name: 'About', path: '/user/about' },
        { name: 'Resources', path: '/user/resources' },
        { name: 'Self Assessment', path: '/user/assessment' },
        { name: 'Emergency', path: '/user/emergency' },
    ];

    const handleLogout = () => {
        // Clear the session storage
        sessionStorage.clear();
        toast.success('Logged out successfully!');
        navigate('/login');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.date || !formData.time) {
            toast.error('Please fill all required fields.');
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/api/appointments`, formData);
            if (response.status === 201) {
                toast.success('Appointment booked successfully!');
                setShowForm(false);
                setFormData({ name: '', email: '', date: '', time: '', message: '' });
            }
        } catch (error) {
            console.error(error);

            if (error.response) {
                toast.error(`Server Error: ${error.response.data.message}`);
            } else if (error.request) {
                toast.error('No response from server. Please try again later.');
            } else {
                toast.error(`Error: ${error.message}`);
            }
        }
    };

    return (
        <motion.div className="main" initial="hidden" animate="visible" variants={fadeInVariant}>
            {/* Navbar */}
            <nav className="flex justify-between items-center px-10 sticky bg-[#b7fdd3] top-0 z-50">
                <img src={Logo} alt="Logo" className="w-[7%]" />
                <ul className="flex items-center gap-5 bg-[#8abe9f] px-10 text-white p-3 rounded-full">
                    {navItems.map((item, index) => (
                        <Link to={item.path} key={index}>
                            <li
                                className={`nav-item ${location.pathname === item.path ? 'active' : ''
                                    }`}
                            >
                                {item.name}
                            </li>
                        </Link>
                    ))}
                </ul>
                <div className="flex items-center gap-5">
                    <button className="flex items-center gap-3 border border-[#779F87] p-3 rounded-full text-[#6a8f79] hover:bg-[#779F87] hover:text-white transition-all duration-300">
                        <span className="border-b-2 border-black border-opacity-30 hover:border-white">
                            Professional
                        </span>
                        <img src={Arrow} alt="Arrow" className="w-4" />
                    </button>
                    <button
                        className="p-2 px-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="mt-10 pt-10 p-5 flex flex-col items-center justify-center gap-10 py-20">
                <motion.h1 className="text-4xl w-[78%] text-center font-medium" variants={fadeInVariant}>
                    Connect with Trusted Mental Health Professionals and they will Understand Your thoughts and will help You <b>{username}</b> 
                </motion.h1>
                <div className="flex items-center mx-28">
                    <motion.p variants={fadeInVariant}>
                        <div className="w-[70%] ml-5 font-medium bg-black bg-opacity-15 p-5 rounded-3xl border-2 border-black">
                            Our experts are here to support your journey toward well-being by offering
                            compassionate, personalized care tailored to your unique needs.
                        </div>
                    </motion.p>
                    <motion.p variants={fadeInVariant}>
                        <img src={Appointment} alt="Appointment" className="w-[150%]" />
                    </motion.p>
                </div>
                <motion.p variants={fadeInVariant} className="flex justify-center items-center">
                    <button
                        className="bg-[#356B4A] text-white px-10 py-3 rounded-3xl font-bold hover:bg-[#2b573e] transition-all duration-300"
                        onClick={() => setShowForm(true)}
                    >
                        Book an Appointment
                    </button>
                </motion.p>
            </div>

            {/* Appointment Form Modal */}
            {showForm && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] md:w-[40%]">
                        <h2 className="text-xl font-semibold text-center mb-5">Book Appointment</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            )}

            <ProfessionalSection />

            <Footer />
        </motion.div>
    );
};

export default UserProfessional;
