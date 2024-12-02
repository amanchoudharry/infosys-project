import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/infosys-main.png';
import Arrow from '../../assets/icons/right-arrow.png';
import { Link } from 'react-router-dom';
import About1 from '../../assets/about1.png';
import Service1 from '../../assets/service1.png';
import Service2 from '../../assets/service2.jpg';
import Service3 from '../../assets/service3.png';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const About = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/dashboard/user' },
        { name: 'About', path: '/user/about' },
        { name: 'Resources', path: '/user/resources' },
        { name: 'Self Assessment', path: '/user/assessment' },
        { name: 'Emergency', path: '/user/emergency' },
    ];

    const services = [
        {
            name: "Emergency Support",
            desc: "We provide all the emergency contacts, which are available in our Emergency section in the navigation bar.",
            img: Service1
        },
        {
            name: "Improve Mental Health",
            desc: "We provide resources and contacts to help improve mental health, available in the Resources section.",
            img: Service2
        },
        {
            name: "Professional Support",
            desc: "We offer access to professional support contacts, available in the Professional section.",
            img: Service3
        }
    ];

    const handleLogout = () => {
        Cookies.remove('role');
        Cookies.remove('session');
        toast.success('Logged out successfully!');
        navigate('/login');
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className='main'>
            {/* Navbar */}
            <motion.nav
                className="flex justify-between items-center px-10 sticky bg-[#b7fdd3] top-0 z-50 shadow-lg transition-all duration-500"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
            >
                <img src={Logo} alt="Logo" className="w-24" />
                <ul className="flex items-center gap-5 bg-[#8abe9f] px-10 text-white p-3 rounded-full">
                    {navItems.map((item, index) => (
                        <Link to={item.path} key={index}>
                            <li className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
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
            </motion.nav>

            {/* About Section-1 */}
            <motion.section
                className="bg-[#71d699] shadow-xl shadow-[#4CAB72] flex justify-start items-center"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
            >
                <div className="m-10 pt-10 p-5 w-[65%] flex flex-col gap-10 py-20">
                    <motion.h1 className="text-5xl" variants={fadeInLeft}>
                        Provides <b>Emergency Support</b> and Elevating <b>Mental Well-being</b>
                    </motion.h1>
                    <motion.p variants={fadeInLeft}>
                        Our website provides contacts to get help in emergency situations. You can find all the helpline contacts in our Emergency section.
                    </motion.p>
                    <motion.p variants={fadeInLeft}>
                        Our main motive is to provide valuable resources that will improve mental well-being and offer access to professional support.
                    </motion.p>
                    <Link to={'/user/emergency'}>
                        <motion.button
                            className="px-3 p-2 flex items-center justify-center gap-2 w-fit rounded-full text-white bg-[#356B4A] transition duration-500 transform hover:scale-105"
                            variants={fadeInLeft}
                        >
                            <h1>Emergency Contact</h1>
                            <i className="fa-solid fa-truck-medical"></i>
                        </motion.button>
                    </Link>
                </div>
                <motion.img
                    src={About1}
                    alt="about"
                    className='p-10 w-[30%] rounded-3xl'
                    variants={fadeInRight}
                />
            </motion.section>

            {/* About Section-2 */}
            <motion.section
                className='m-10 flex flex-col justify-center items-center'
                variants={fadeIn}
                initial="hidden"
                animate="visible"
            >
                <h1 className="text-center font-bold text-4xl w-[55%]">
                    WHAT WE DO HERE
                </h1>
                <div className='flex flex-col justify-center items-center'>
                    {services.map((item, key) => (
                        <motion.div
                            key={key}
                            className='mt-10 bg-[#4CAB72] shadow-xl shadow-green-700 w-[60%] rounded-xl p-5 transition duration-500 transform hover:scale-105'
                            variants={fadeIn}
                        >
                            <h1 className='text-2xl text-center font-bold text-white'>{item.name}</h1>
                            <div className='flex justify-center items-center gap-10 mt-5'>
                                <div className='flex flex-col gap-5 bg-gray-300 bg-opacity-40 border-2 shadow-xl shadow-green-700 border-green-700 font-semibold p-2 px-3 rounded-xl'>
                                    <p>{item.desc}</p>
                                    <div className='flex items-center justify-center gap-2 w-full'>
                                        <i className="fa-solid fa-headset"></i>
                                        <p>24/7 Support</p>
                                    </div>
                                </div>
                                <img src={item.img} alt={item.name} className='w-[45%]' />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* About-Section-3 */}
            <motion.div
                className="bg-green-900 text-white py-10 px-5 mb-10"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
            >
                <h1 className="text-3xl font-bold text-center mb-10">How Does It Work?</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Cards */}
                    {["Emergency Support", "Mental Health", "Professional Support"].map((title, index) => (
                        <motion.div
                            key={index}
                            className="bg-white text-black p-5 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                            variants={fadeIn}
                        >
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                                    <span className="text-lg font-bold text-green-900">{`0${index + 1}`}</span>
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
                            <p className="text-center text-gray-700">
                                {index === 0
                                    ? "All the emergency contacts are available in the Emergency section."
                                    : index === 1
                                        ? "Mental health resources are available in the Resources section."
                                        : "Professional support is available in the Professional section."}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            <Footer />
        </div>
    );
};

export default About;
