import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/infosys-main.png';
import { Link } from 'react-router-dom';
import Expert from '../../assets/expert1.jpg';
import Footer from '../../components/Footer';
import Service1 from '../../assets/assessment1.jpg';
import Service2 from '../../assets/assessment2.jpg';
import Service3 from '../../assets/assessment3.jpg';
import Service4 from '../../assets/assessment4.jpg';
import Resource1 from '../../assets/resource-recommend-1.png';
import Resource2 from '../../assets/resource-recommend-2.png';
import Resource3 from '../../assets/resource-recommend-3.png';

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

const Professional = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = sessionStorage.getItem('username');

  const navItems = [
    { name: 'Home', path: '/dashboard/professional' },
    { name: 'Resources', path: '/professional/resources' },
    { name: 'Appoinments', path: '/professional/appointments' },
    { name: 'Sessions', path: '/professional/sessions' }
  ];
  const handleLogout = () => {
    // Clear the session storage
    sessionStorage.clear();
    navigate('/login');
    window.location.reload();
  };
  const services = [
    {
      img: Service1,
      name: 'Help them with Anxiety Issues and related problems',
    },
    {
      img: Service2,
      name: 'Overcome Depression and provide necessary support',
    },
    {
      img: Service3,
      name: 'Solutions to Personality Disorders',
    },
    {
      img: Service4,
      name: 'Steps to prevent the Dementia and provide sessions',
    },
  ];

  const resources = [{
    img: Resource1,
    name: "Provide them with the necessary resources that can help the patients to overcome from the issues",
  },
  {
    img: Resource2,
    name: "Suggest with Training Modules that can helps to improve the mental health with practical sessions"
  },
  {
    img: Resource3,
    name: "Help them with the necessary tools and Best Practices"
  }
  ]

  return (
    <motion.div
      className="main"
      initial="hidden"
      animate="visible"
      variants={fadeInVariant}
    >
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
          <button
            className="p-2 px-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Professional Section-1 */}
      <motion.section
        className="bg-[#71d699] shadow-xl shadow-[#4CAB72] mx-24 my-10  rounded-2xl flex justify-center items-center"
        variants={fadeInVariant}
      >
        <div className="m-10 pt-10 p-5 w-[60%] flex flex-col gap-5 py-20">
          <h1 className="text-4xl w-full flex flex-col gap-3">
            <span>Welcome, <span className='font-semibold'>Dr. {username}</span>!</span>
            <p>Empowering Lives Through Your Expertise</p>
          </h1>
          <p>
            As a trusted mental health professional, you play a pivotal role in transforming lives. <br /> Our platform equips you with the tools to make your sessions more impactful and efficient.
          </p>
          <a href='#about'>
            <button className="px-3 p-2 rounded-full text-white bg-[#356B4A]">
              Get Started
            </button>
          </a>
        </div>
        <img src={Expert} alt="Home Illustration" className="rounded-xl" />
      </motion.section>

      {/* Professional Section-2 */}
      <motion.section id='about'
        className="mx-[70px] my-10 rounded-2xl flex justify-center items-center"
        variants={fadeInVariant}
      >
        <div className=" p-5 w-full flex flex-col gap-5">
          <h1 className='text-center font-bold text-4xl'>Why Choose Us?</h1>
          <p className='font-medium text-center'>We understand the unique challenges you face as a mental health professional. <br /> Our platform is designed to simplify your workflow so you can focus on what matters most—your clients’ well-being.</p>
          <div className="w-full flex items-center gap-10 flex-wrap justify-center">
            {services.map((item, key) => (
              <motion.div
                key={key}
                className="flex flex-col items-start justify-between shadow-xl shadow-[#4CAB72] rounded-xl bg-[#71d699] p-5 gap-3 w-[22%]"
                variants={fadeInVariant}
              >
                <img src={item.img} alt={item.name} className="w-full rounded-2xl" />
                <div>
                  <h1 className="font-bold">{item.name}</h1>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Professional Section-3 */}
      <motion.section
        className="bg-[#71d699] mx-24 my-10 shadow-xl shadow-[#4CAB72] rounded-2xl flex justify-center items-center"
        variants={fadeInVariant}
      >
        <div className="p-5 flex flex-col gap-5">
          <h1 className='font-bold text-4xl text-center'>Today Key Metrics and Updates</h1>
          <motion.div
            className="text-white py-10 px-5 mb-10"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Cards */}
              {[{ name: "Upcoming Appoinments", link: "/professional/appointments" }, { name: "Session to Attend", link: "/professional/sessions" }, { name: "Professional Support" }].map((item, index) => (
                <Link to={item.link}>
                  <motion.div
                    key={index}
                    className="bg-white text-black p-5 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                    variants={fadeIn}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-2 px-5 bg-green-200 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-green-900"><i class="fa-solid fa-caret-right text-4xl"></i></span>
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-center mb-2">{item.name}</h2>
                    <p className="text-center text-gray-700">
                      {index === 0
                        ? "Appoinments are scheduled for today. Check the Appoinments section for more details."
                        : index === 1
                          ? "Sessions are scheduled for today. Check the Sessions section for more details."
                          : "Check for the professional support and updates which can help the patients."}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Professional Section-4 */}
      <motion.section
        className="bg-[#71d699] mx-24 my-10 shadow-xl shadow-[#4CAB72] rounded-2xl flex justify-center items-center"
        variants={fadeInVariant}
      >
        <div className="p-5 flex flex-col gap-5">
          <h1 className='font-bold text-4xl text-center'>Recommend Resources for Users </h1>
          <div className="flex items-center gap-10 flex-wrap justify-center">
            {resources.map((item, key) => (
              <motion.div
                key={key}
                className="flex flex-col items-start justify-between hover:shadow-xl hover:shadow-[#4CAB72] rounded-xl w-[30%] p-5 gap-3"
                variants={fadeInVariant}
              >
                <img src={item.img} alt={item.name} className="w-full h-[50%] rounded-2xl" />
                <div>
                  <h1 className="font-bold">{item.name}</h1>
                  <div className="flex items-center justify-center mt-5 cursor-pointer">
                    <div className="p-2 px-5 bg-green-200 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-green-900"><i class="fa-solid fa-caret-right text-4xl"></i></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <Footer />
    </motion.div>
  );
};

export default Professional;
