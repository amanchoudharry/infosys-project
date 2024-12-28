import { Link } from 'react-router-dom';
import Professional1 from '../assets/professional1.png';
import Professional2 from '../assets/professional2.png';
import Professional3 from '../assets/professional3.png';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BASE_URL = 'http://localhost:8080';

const ProfessionalSection = () => {
    const [modalType, setModalType] = useState(null);
    const userId = sessionStorage.getItem('userId');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        userId: userId || '', // Fallback if userId is not in session storage
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!formData.userId) {
            toast.error('User ID is missing. Please log in.');
            return;
        }
        // Validate form fields
        if (!formData.name || !formData.email || !formData.phone) {
            setFormError('Please fill all the required fields.');
            return; // Prevent form submission
        }

        // If all fields are filled, clear the error and proceed with form submission
        setFormError('');
        setLoading(true); // Start loading

        try {
            const response = await axios.post(
                `${BASE_URL}/api/services/${modalType}`,
                formData
            );
            if (response.status === 201) {
                toast.success('Request submitted successfully!');
                setFormData({ name: '', email: '', phone: '', message: '', userId });
                setModalType(null);
            }
        } catch (error) {
            console.error('Error submitting request:', error);
            if (error.response && error.response.status === 403) {
                toast.error('Access denied. Please check your credentials or permissions.');
            } else {
                toast.error('An error occurred. Please try again.');
            }
        } finally {
                     setLoading(false); // End loading
                 }
    };

    return (
        <div>
            {/* Professional Services Section */}
            <motion.section
                className="bg-[#71d699] mx-36 mt-10 shadow-xl shadow-[#4CAB72] rounded-2xl flex justify-center items-center"
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
            >
                <div className="m-10 p-5 w-[60%] flex flex-col gap-10">
                    <h1 className="text-4xl font-bold text-center">Professional Services</h1>
                    <div className="flex justify-center items-center gap-5">
                        <button
                            onClick={() => setModalType('counseling')}
                            className="px-3 p-2 rounded-3xl flex items-center gap-2 text-white bg-[#356B4A]"
                        >
                            <p>Counseling Services</p>
                            <div className="border-2 border-white rounded-full bg-[#356B4A] p-1 px-2">
                                <i className="fa-solid fa-plus text-white"></i>
                            </div>
                        </button>
                        <button
                            onClick={() => setModalType('psychiatric')}
                            className="px-3 p-2 rounded-3xl flex items-center gap-2 text-white bg-[#356B4A]"
                        >
                            <p>Psychiatric Support</p>
                            <div className="border-2 border-white rounded-full bg-[#356B4A] p-1 px-2">
                                <i className="fa-solid fa-plus text-white"></i>
                            </div>
                        </button>
                        <button
                            onClick={() => setModalType('therapy')}
                            className="px-3 p-2 rounded-3xl flex items-center gap-2 text-white bg-[#356B4A]"
                        >
                            <p>Therapy Session</p>
                            <div className="border-2 border-white rounded-full bg-[#356B4A] p-1 px-2">
                                <i className="fa-solid fa-plus text-white"></i>
                            </div>
                        </button>
                    </div>
                </div>
            </motion.section>

            {/* Modal for Form Submission */}
            {modalType && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] md:w-[40%]">
                        <h2 className="text-xl font-semibold text-center mb-5">
                            {modalType === 'counseling' && 'Counseling Services'}
                            {modalType === 'psychiatric' && 'Psychiatric Support'}
                            {modalType === 'therapy' && 'Therapy Session'}
                        </h2>

                        {/* Error message */}
                        {formError && (
                            <div className="mb-4 text-red-500 text-center">
                                <strong>{formError}</strong>
                            </div>
                        )}

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
                                <label className="block text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
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
                                    onClick={() => setModalType(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading} // Disable while loading
                                    className={`px-4 py-2 rounded-lg ${
                                        loading
                                            ? 'bg-gray-500 text-gray-300'
                                            : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}
                                >
                                    {loading ? 'Saving...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Professional Section 3 */}
            <motion.div
                className="bg-green-900 text-white py-10 px-5 my-10 "
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
            >
                <div className="bg-green-900 text-white px-5">
                    <h1 className="text-4xl font-bold text-center mb-10">Our Professionals</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Card 1 */}
                        <div className="bg-white text-black p-5 px-7 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                                    <span className="text-lg font-bold text-green-900">01</span>
                                </div>
                            </div>
                            <img src={Professional1} alt="img" className='rounded-xl' />
                            <p className="text-center text-gray-700 mt-2 font-semibold">
                                Dr. Ravi Sharma, Licensed Psychologist
                                (Specialization - Anxiety, Trauma ,Depression)
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white text-black p-5 px-7 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                                    <span className="text-lg font-bold text-green-900">02</span>
                                </div>
                            </div>
                            <img src={Professional2} alt="img" className='rounded-xl h-[65%]' />
                            <p className="text-center text-gray-700 mt-3 font-semibold">
                                Dr. Ananth Menon, Professional Theraphist
                                (Specialization - Anxiety, Trauma ,Depression)
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white text-black p-5 px-7 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                                    <span className="text-lg font-bold text-green-900">03</span>
                                </div>
                            </div>
                            <img src={Professional3} alt="img" className='rounded-xl' />
                            <p className="text-center text-gray-700 mt-2 font-semibold">
                                Dr. Sai Kishore, Licensed Counsellor
                                (Specialization - Mental Health and Well-Being)
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Professional Section 4 */}
            <motion.section
                className="bg-[#71d699] mx-36 my-20 mt-0 shadow-xl shadow-[#4CAB72] rounded-2xl flex justify-center items-center"
                variants={fadeInVariant}
            >
                <div className="m-10 pt p-5 w-[60%] flex flex-col gap-10">
                    <h1 className="text-4xl font-bold text-center">
                        Explore Our Mental Health Resources
                    </h1>
                    <div className='flex justify-center items-center gap-5'>
                        <div className='flex flex-col items-center justify-center gap-5 bg-[#246D41] bg-opacity-30 w-[50%] rounded-2xl border-2 border-[#356B4A] p-5'>
                            <h1 className='text-2xl font-semibold'>Articles</h1>
                            <p>In-depth reads that explore various aspects of mental health, from overcoming anxiety to improving self-care practices.</p>
                            <Link to={'/user/resources'}>
                                <button className='bg-[#246D41] text-white border-2 border-[#246D41] p-2 px-3'>Browse Articles</button>
                            </Link>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-5 bg-[#246D41] bg-opacity-30 w-[50%] rounded-2xl border-2 border-[#356B4A] p-5'>
                            <h1 className='text-2xl font-semibold'>Videos</h1>
                            <p>Watch expert talks, tutorials, and motivational stories that inspire and educate on mental health topics that help to improve their mindest.</p>
                            <Link to={'/user/appointment'}>
                                <button className='bg-[#246D41] text-white border-2 border-[#246D41] p-2 px-3'>Watch Videos</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default ProfessionalSection;
