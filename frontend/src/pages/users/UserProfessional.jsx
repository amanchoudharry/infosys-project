import React from 'react'
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Logo from '../../assets/infosys-main.png';
import Arrow from '../../assets/icons/right-arrow.png';
import Appointment from '../../assets/appointment.png';
import Professional1 from '../../assets/professional1.png';
import Professional2 from '../../assets/professional2.png';
import Professional3 from '../../assets/professional3.png';
import Footer from '../../components/Footer';
const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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


const UserProfessional = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
        Cookies.remove('role');
        Cookies.remove('session');
        toast.success('Logged out successfully!');
        navigate('/login');
    };

    const navItems = [
        { name: 'Home', path: '/dashboard/user' },
        { name: 'About', path: '/user/about' },
        { name: 'Resources', path: '/user/resources' },
        { name: 'Self Assessment', path: '/user/assessment' },
        { name: 'Emergency', path: '/user/emergency' },
    ];


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
                    <button className="flex items-center gap-3 border border-[#779F87] p-3 rounded-full text-[#6a8f79] hover:bg-[#779F87] hover:text-white transition-all duration-300">
                        <span className='border-b-2 border-black border-opacity-30 hover:border-white'>Professional</span>
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

            {/* Professional Section 1 */}
            <div className="mt-10 pt-10 p-5 flex flex-col gap-10 py-20">
                <motion.h1 className="text-5xl text-center font-semibold" variants={fadeInLeft}>
                    Connect with Trusted Mental Health Professionals
                </motion.h1>
                <div className='flex items-center mx-28'>
                    <motion.p variants={fadeInLeft}>
                        <div className='w-[70%] ml-5 font-medium bg-black bg-opacity-15 p-5 rounded-3xl border-2 border-black'>
                            Our experts are here to support your journey toward well-being by offering compassionate, personalized care tailored to your unique needs. Whether you're navigating a challenging moment or seeking long-term support, our team of dedicated professionals is ready to help you every step of the way
                        </div>
                    </motion.p>
                    <motion.p variants={fadeInLeft}>
                        <img src={Appointment} alt="img" className='w-[150%]' />
                    </motion.p>
                </div>
                <motion.p variants={fadeInLeft}>
                    <div className='flex justify-center items-center mt-5'>
                        <button className='bg-[#356B4A] text-white p-2 px-24 rounded-2xl font-bold'>Book an Appoinment</button>
                    </div>
                </motion.p>
            </div>

            {/* Professional Section 2 */}
            <motion.section
                className="bg-[#71d699] mx-36 mt-0 shadow-xl shadow-[#4CAB72] rounded-2xl flex justify-center items-center"
                variants={fadeInVariant}
            >
                <div className="m-10 pt p-5 w-[60%] flex flex-col gap-10">
                    <h1 className="text-4xl font-bold text-center">
                        Professional Services
                    </h1>
                    <div className='flex justify-center items-center gap-5'>
                        <button className="px-3 p-2 rounded-3xl flex items-center gap-2 text-white bg-[#356B4A]">
                            <p>Counselling Services</p>
                            <div className='border-2 border-white rounded-full bg-[#356B4A] p-1 px-2'>
                                <i class="fa-solid fa-plus text-white"></i>
                            </div>
                        </button>
                        <button className="px-3 p-2 rounded-3xl flex items-center gap-2 text-white bg-[#356B4A]">
                            <p>Psychiatric Support</p>
                            <div className='border-2 border-white rounded-full bg-[#356B4A] p-1 px-2'>
                                <i class="fa-solid fa-plus text-white"></i>
                            </div>
                        </button>
                        <button className="px-3 p-2 rounded-3xl flex items-center gap-2 text-white bg-[#356B4A]">
                            <p>Theraphy Session</p>
                            <div className='border-2 border-white rounded-full bg-[#356B4A] p-1 px-2'>
                                <i class="fa-solid fa-plus text-white"></i>
                            </div>
                        </button>
                    </div>
                </div>
            </motion.section>

            {/* Professional Section 3 */}
            <motion.div
                className="bg-green-900 text-white py-10 px-5 my-10 "
                variants={fadeIn}
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
                            <button className='bg-[#246D41] text-white border-2 border-[#246D41] p-2 px-3'>Browse Articles</button>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-5 bg-[#246D41] bg-opacity-30 w-[50%] rounded-2xl border-2 border-[#356B4A] p-5'>
                            <h1 className='text-2xl font-semibold'>Videos</h1>
                            <p>Watch expert talks, tutorials, and motivational stories that inspire and educate on mental health topics that help to improve their mindest.</p>
                            <button className='bg-[#246D41] text-white border-2 border-[#246D41] p-2 px-3'>Watch Videos</button>
                        </div>
                    </div>
                </div>
            </motion.section>
            <Footer />
        </motion.div >
    )
}

export default UserProfessional
