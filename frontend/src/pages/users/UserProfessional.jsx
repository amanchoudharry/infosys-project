import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Logo from '../../assets/infosys-main.png';
import Arrow from '../../assets/icons/right-arrow.png';
import Appointment from '../../assets/appointment.png';
import Footer from '../../components/Footer';
import ProfessionalSection from '../../components/ProfessionalSection';
import BookAppoinment from '../../components/BookAppointment';
import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const UserProfessional = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const username = sessionStorage.getItem('username');

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
        navigate('/login');
        window.location.reload();
    };

    const userId = sessionStorage.getItem('userId');
    const [showProfile, setShowProfile] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    // Fetch the current profile image
    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${userId}`)
            .then((response) => {
                setProfileImage(response.data.profileImage);
            })
            .catch((error) => console.error('Error fetching profile image:', error));
    }, [userId]);

    return (
        <motion.div className="main" initial="hidden" animate="visible" variants={fadeInVariant}>
            {/* Navbar */}
            <nav className="flex justify-between items-center px-24 sticky bg-[#b7fdd3] top-0 z-50">
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
                    {profileImage ? (
                        <img
                            onClick={() => { setShowProfile(!showProfile) }}
                            src={`data:image/png;base64,${profileImage}`}
                            alt="Profile"
                            className="w-16 h-16 object-cover rounded-full cursor-pointer"
                        />
                    ) : (
                        <div className='border-2 border-black p-2 transition-all duration-300 cursor-pointer rounded-full px-3' onClick={() => { setShowProfile(!showProfile) }}>
                            <i class="fa-regular fa-user text-2xl"></i>
                        </div>
                    )}
                </div>

                {showProfile && (<div className='absolute top-20 bg-white transition-all duration-300 rounded-xl px-10 shadow-xl shadow-green-600 p-3 right-24 flex items-center gap-4 py-5'>
                    <Link to={'/user/profile'}><button className="p-2 px-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300">Profile</button></Link>
                    <button
                        className="p-2 px-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>)}
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
                <BookAppoinment/>
            </div>


            <ProfessionalSection />

            <Footer />
        </motion.div>
    );
};

export default UserProfessional;
