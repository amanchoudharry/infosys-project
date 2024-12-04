import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/infosys-main.png';
import Arrow from '../../assets/icons/right-arrow.png';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import EmergencyTable from '../../components/EmergencyTable';
import { motion } from 'framer-motion';
import Police from '../../assets/police.png';
import Ambulance from '../../assets/ambulance.png';
import Fire from '../../assets/fire.png';
import EmergencyContactForm from '../../components/EmergencyContactForm';
import { toast } from 'react-toastify';  //
import 'react-toastify/dist/ReactToastify.css';
const Emergency = () => {
    const navigate = useNavigate();
    const location = useLocation();
//     const userId = sessionStorage.getItem('userId');

//     const getUserIdFromCookies = () => {
//         const match = document.cookie.match(new RegExp('(^| )userId=([^;]+)'));
//         return match ? match[2] : null;
//     };

    const username = sessionStorage.getItem('username');

     const [loading, setLoading] = useState(false);

    const fadeInVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const navItems = [
        { name: 'Home', path: '/dashboard/user' },
        { name: 'About', path: '/user/about' },
        { name: 'Resources', path: '/user/resources' },
        { name: 'Self Assessment', path: '/user/assessment' },
        { name: 'Emergency', path: '/user/emergency' },
    ];
    const handleLogout = () => {
        sessionStorage.clear();
        toast.success('Logged out successfully!');
        navigate('/login');
    };

    const sendSOS = async () => {
            setLoading(true);  // Set loading to true when request starts
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const userId = sessionStorage.getItem('userId');
                    console.log(userId)

                    try {
                        // Send SOS request with latitude and longitude
                        const response = await axios.post('http://localhost:8080/api/send-sos', {
                            latitude,
                            longitude,
                            username,
                            userId
                        }, {
                             withCredentials: true  // Ensure the cookie is sent with the request
                         });
                        setLoading(false);  // Set loading to false when request completes
                        toast.success('SOS sent successfully!');  // Show success toaster
                        console.log(response.data);  // Handle success response
                    } catch (error) {
                        setLoading(false);  // Set loading to false in case of error
                        toast.error('Failed to send SOS. Please try again!');  // Show error toaster
                        console.error("Error sending SOS", error);
                    }
                }, (error) => {
                    setLoading(false);  // Set loading to false on error
                    toast.error('Location access denied or error in fetching location.');  // Show error toaster
                    alert("Location access denied or error in fetching location.");
                });
            } else {
                setLoading(false);  // Set loading to false if geolocation is not supported
                toast.error('Geolocation is not supported by this browser.');  // Show error toaster
                alert("Geolocation is not supported by this browser.");
            }
        };

    return (

        <div className='main'>
            {/* Navbar */}
            <nav className="flex justify-between items-center px-10 fade-in sticky bg-[#b7fdd3] top-0 z-50">
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
                    <Link to={'/user/professional'}>
                        <button className="flex items-center gap-3 border border-[#779F87] p-3 rounded-full text-[#6a8f79] hover:bg-[#779F87] hover:text-white transition-all duration-300">
                            <span>Professional</span>
                            <img src={Arrow} alt="Arrow" className="w-4" />
                        </button>
                    </Link>
                    <button
                        className="p-2 px-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Emergency-Details */}
            <motion.section
                className="ml-14 mt-5 rounded-2xl flex justify-start gap-5 items-center"
                variants={fadeInVariant}
            >
                <div className="m-10 flex flex-col gap-10 shadow-xl shadow-[#4CAB72] bg-[#71d699]  w-[50%] p-10 rounded-xl">
                    <h1 className="text-4xl font-bold text-center">
                        What is Your Emergency?
                    </h1>
                    <div className='flex items-center gap-5'>
                        <div className='flex flex-col gap-2 items-center rounded-md transition-transform transform hover:scale-95 ' onClick={() => window.location.href = 'tel:100'}>
                            <img src={Police} alt="police" />
                            <h1 className='font-semibold text-2xl'>Police</h1>
                        </div>
                        <div className='flex flex-col gap-2 items-center rounded-md transition-transform transform hover:scale-95' onClick={() => window.location.href = 'tel:101'}>
                            <img src={Fire} alt="fire" />
                            <h1 className='font-semibold text-2xl'>Fire</h1>
                        </div>
                        <div className='flex flex-col gap-2 items-center rounded-md transition-transform transform hover:scale-95' onClick={() => window.location.href = 'tel:102'}>
                            <img src={Ambulance} alt="ambulance" />
                            <h1 className='font-semibold text-2xl'>Ambulance</h1>
                        </div>
                    </div>
                </div>
                <button
                    onClick={sendSOS}
                    className="bg-red-600 text-white p-14 text-4xl flex flex-col gap-5 items-center py-20 rounded-xl transform transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-red-700 active:scale-100 disabled:opacity-50"
                    disabled={loading}
                >
                    <p>{loading ?'Sending...': 'Send '}<span className="font-bold">SOS</span> To</p>
                    <div className='flex items-center gap-3'>
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <p>Emergency Contacts</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <p>with Location </p>
                    </div>
                </button>
            </motion.section>

            {/* Emergency Contacts */}

            <EmergencyContactForm />

            <section className="">
                <EmergencyTable />
            </section>

            <Footer />
        </div>
    )
}

export default Emergency
