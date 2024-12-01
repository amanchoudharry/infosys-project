import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
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
const Emergency = () => {
    const navigate = useNavigate();
    const location = useLocation();

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
        Cookies.remove('role');
        Cookies.remove('session');
        toast.success('Logged out successfully!');
        navigate('/login');
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
                <div className="m-10 flex flex-col gap-10 shadow-xl shadow-[#4CAB72] bg-[#71d699] w-[50%] p-10 rounded-xl">
                    <h1 className="text-4xl font-bold text-center">
                        What is Your Emergency?
                    </h1>
                    <div className='flex items-center gap-5'>
                        <div className='flex flex-col gap-2 items-center'>
                            <img src={Police} alt="police" />
                            <h1 className='font-semibold text-2xl'>Police</h1>
                        </div>
                        <div className='flex flex-col gap-2 items-center'>
                            <img src={Fire} alt="police" />
                            <h1 className='font-semibold text-2xl'>Fire</h1>
                        </div>
                        <div className='flex flex-col gap-2 items-center'>
                            <img src={Ambulance} alt="police" />
                            <h1 className='font-semibold text-2xl'>Ambulance</h1>
                        </div>
                    </div>
                </div>
                <button className='bg-red-600 text-white p-20 text-4xl flex flex-col gap-5 items-center py-28 rounded-xl'>
                    <p>SOS Alert</p>
                    <div className='flex items-center gap-3'>
                        <i class="fa-solid fa-phone"></i>
                        <p>Emergency Contact </p>
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
