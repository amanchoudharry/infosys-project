import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:8080';

const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BookAppointment = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        time: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [showForm, setShowForm] = useState(false);
    const userId = sessionStorage.getItem('userId');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error message on input change
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required.';
        if (!formData.email) newErrors.email = 'Email is required.';
        if (!formData.date) newErrors.date = 'Date is required.';
        if (!formData.time) newErrors.time = 'Time is required.';
        return newErrors;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/api/appointments`, formData, {
                headers: { userId: userId },
            });
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
        <div>
            <motion.p variants={fadeInVariant} className="flex justify-center items-center">
                <button
                    className="bg-[#356B4A] text-white px-10 py-3 rounded-3xl font-bold hover:bg-[#2b573e] transition-all duration-300"
                    onClick={() => setShowForm(true)}
                >
                    Book an Appointment
                </button>
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
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                    />
                                    {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                    />
                                    {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
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
            </motion.p>
        </div>
    );
};

export default BookAppointment;
