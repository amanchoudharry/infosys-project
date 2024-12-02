import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Logo from '../../assets/infosys-main.png';
import Arrow from '../../assets/icons/right-arrow.png';
import { Link } from 'react-router-dom';
import Home from '../../assets/home.jpg';
import Service1 from '../../assets/assessment1.jpg';
import Service2 from '../../assets/assessment2.jpg';
import Service3 from '../../assets/assessment3.jpg';
import Service4 from '../../assets/assessment4.jpg';
import Expert1 from '../../assets/expert1.jpg';
import Expert2 from '../../assets/expert2.jpg';
import Expert3 from '../../assets/expert3.jpg';
import Expert4 from '../../assets/expert4.jpg';
import Footer from '../../components/Footer';

const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const UserDashboard = () => {
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
            img: Service1,
            name: 'Anxiety',
            desc: 'Anxiety is an emotion characterized by feelings of tension, worried thoughts, and physical changes.',
        },
        {
            img: Service2,
            name: 'Depression',
            desc: 'Depression is an emotion characterized by feelings of sadness, hopelessness, and low energy.',
        },
        {
            img: Service3,
            name: 'Personality Disorders',
            desc: 'Personality disorders involve enduring patterns of behavior and thinking that affect functioning.',
        },
        {
            img: Service4,
            name: 'Dementia',
            desc: 'Dementia affects memory, thinking, orientation, and the ability to perform daily activities.',
        },
    ];

    const experts = [Expert1, Expert2, Expert3, Expert4];

    const handleLogout = () => {
        Cookies.remove('role');
        Cookies.remove('session');
        toast.success('Logged out successfully!');
        navigate('/login');
    };

    return (
        <motion.div
            className="main"
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
        >
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

            {/* Section 1 */}
            <motion.section
                className="bg-[#71d699] mx-24 mt-10 shadow-xl shadow-[#4CAB72] rounded-2xl flex justify-center items-center"
                variants={fadeInVariant}
            >
                <div className="m-10 pt-10 p-5 w-[50%] flex flex-col gap-10 py-20">
                    <h1 className="text-5xl">
                        Best Online <b>Mental</b> <br />
                        <b>Health</b> Counselling and Therapy Services
                    </h1>
                    <p>
                        Our platform guarantees private and free virtual sessions with
                        professionals. <br /> Explore articles and assessments to improve your
                        mental well-being.
                    </p>
                    <Link to={'/user/about'}>
                        <button className="px-3 p-2 rounded-full text-white bg-[#356B4A]">
                            Get Started for Free
                        </button>
                    </Link>
                </div>
                <img src={Home} alt="Home Illustration" className="rounded-xl" />
            </motion.section>

            {/* Section 2 */}
            <motion.section className="mt-14" variants={fadeInVariant}>
                <h1 className="text-5xl font-semibold text-center">Mental Health Assessment Services</h1>
                <div className="w-full p-10 flex items-center gap-10 flex-wrap justify-center">
                    {services.map((item, key) => (
                        <motion.div
                            key={key}
                            className="flex flex-col items-start justify-between shadow-xl shadow-[#4CAB72] rounded-xl bg-[#71d699] p-5 gap-3 w-[300px] h-[400px]"
                            variants={fadeInVariant}
                        >
                            <img src={item.img} alt={item.name} className="w-full h-[50%] rounded-2xl" />
                            <div>
                                <h1 className="font-bold">{item.name}</h1>
                                <p>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <Link to={'/user/assessment'}>
                    <div className="flex justify-center">
                        <button className="px-3 p-2 rounded-full flex items-center justify-center gap-3 text-white bg-[#356B4A]">
                            <h1>Self Assessment</h1>
                            <div className="border-2 border-white p-1 rounded-full px-2">
                                <i className="fa-solid fa-right-long"></i>
                            </div>
                        </button>
                    </div>
                </Link>
            </motion.section>

            {/* Section 3 */}
            <motion.section
                className="flex flex-col gap-10 justify-center items-center bg-[#0B5730] p-10 mt-10"
                variants={fadeInVariant}
            >
                <h1 className="text-white text-center font-semibold text-4xl w-[55%]">
                    Start Your Journey to Better Health and Well-being with our Professionals
                </h1>
                <div className="flex items-center justify-center gap-10 flex-wrap">
                    {experts.map((img, key) => (
                        <motion.img
                            src={img}
                            alt={`Expert ${key + 1}`}
                            key={key}
                            className="w-[200px] h-[200px] rounded-full"
                            variants={fadeInVariant}
                        />
                    ))}
                </div>
                <Link to={'/user/professional'}>
                    <div className="flex justify-center">
                        <button className="px-3 p-2 rounded-full flex items-center justify-center gap-3 bg-white">
                            <h1>Professionals</h1>
                            <div className="border-2 border-black p-1 rounded-full px-2">
                                <i className="fa-solid fa-right-long"></i>
                            </div>
                        </button>
                    </div>
                </Link>
            </motion.section>

            {/* Newsletter Section */}
            <motion.section
                className="flex flex-col gap-7 justify-center items-center bg-[#0B5730] p-10 m-14 rounded-2xl"
                variants={fadeInVariant}
            >
                <h1 className="text-3xl text-white font-semibold">Subscribe to Our Newsletter</h1>
                <p className="text-white w-[27%] text-center">
                    Join us and be an important part of our community.
                </p>
                <div className="flex items-center gap-10 w-full justify-center">
                    <div className="bg-black bg-opacity-30 w-[40%] rounded-3xl">
                        <input
                            type="text"
                            className="bg-transparent text-white w-full outline-none p-4 px-5"
                            placeholder="Your email address"
                        />
                    </div>
                    <button className="bg-white p-2 px-3 font-semibold rounded-2xl">Subscribe Now</button>
                </div>
            </motion.section>

            {/* Footer Section */}
            <Footer />
        </motion.div>
    );
};

export default UserDashboard;
