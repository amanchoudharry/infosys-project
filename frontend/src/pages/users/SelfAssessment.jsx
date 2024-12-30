import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Logo from '../../assets/infosys-main.png';
import Arrow from '../../assets/icons/right-arrow.png';
import Assessment from '../../assets/assessment.png';
import Footer from '../../components/Footer';
import axios from 'axios';

const SelfAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = sessionStorage.getItem('userId');
  const username = sessionStorage.getItem('username');

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/dashboard/user' },
    { name: 'About', path: '/user/about' },
    { name: 'Resources', path: '/user/resources' },
    { name: 'Self Assessment', path: '/user/assessment' },
    { name: 'Emergency', path: '/user/emergency' },
  ];

  // Logout handler
  const handleLogout = () => {
    // Clear the session storage
    sessionStorage.clear();
    toast.success('Logged out successfully!');
    navigate('/login');
  };
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
    <motion.div
      className="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
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

      {/* Self Assessment Refer Section */}
      <motion.section
        className="bg-[#71d699] mx-40 mt-10 shadow-xl shadow-[#4CAB72] rounded-2xl flex justify-center items-center"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <div className="m-10 pt-10 p-5 w-[65%] flex flex-col gap-10 py-20">
          <div className="text-4xl flex flex-col gap-5">
            <h1>How are you doing <span className='font-bold'>{username}</span>? </h1>
            <h1>Take Our Mental Health <b>Self Assessment</b></h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-[50%] flex flex-col gap-5 font-medium">
              <p>Online screening is one of the quickest and easiest ways to determine whether you are experiencing symptoms of a mental health condition.</p>
              <p>Mental health conditions, such as depression or anxiety, are real, common and treatable. And recovery is possible.</p>
            </div>
            <img src={Assessment} alt="assessment" />
          </div>
        </div>
      </motion.section>

      {/* Self Assessment Process Section */}
      <motion.section
        className="flex flex-col justify-center items-center my-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold">How Does it Work?</h1>
        <div className="bg-[#71d699] w-[78%] py-5 mt-10 shadow-xl shadow-[#4CAB72] rounded-2xl flex flex-col gap-5 justify-center items-center">
          <h1 className="font-medium text-xl w-[70%]">
            After your mental health test, you will see information, resources, and tools to help you understand and improve your mental health.
          </h1>
          {/* Links */}
          {[
            {
              text: "How can Online Mental Health Testing Help Me?",
              href: "https://screening.mhanational.org/content/how-can-online-mental-health-testing-help-me/",
            },
            {
              text: "What Do My Mental Health Test Results Mean?",
              href: "https://screening.mhanational.org/content/what-do-my-mental-health-test-results-mean/",
            },
            {
              text: "About Our Mental Health Test",
              href: "/user/about",
            }
          ].map((link, index) => (
            <a key={index} target="_blank" rel="noopener noreferrer" href={link.href}>
              <motion.div
                className="bg-black bg-opacity-30 p-2 w-full text-center text-white rounded-2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <h1 className="text-xl">{link.text}</h1>
              </motion.div>
            </a>
          ))}
        </div>
      </motion.section>

      {/* Assessment Attend Section */}
      <motion.section
        className="bg-[#71d699] mx-40 mb-10 shadow-xl shadow-[#4CAB72] rounded-2xl flex justify-center items-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="m-10 w-full flex flex-col justify-center items-center gap-10">
          <h1 className="text-4xl">
            Attend the <b>Self Assessment</b>
          </h1>
          <div className="grid grid-cols-2 grid-rows-3 gap-10">
            {[
              { name: "Depression Test", path: "/user/assessment/test1" },
              { name: "Anxiety Test", path: "/user/assessment/test2" },
              { name: "ADHD Test", path: "/user/assessment/test3" },
              { name: "Bipolar Test", path: "/user/assessment/test4" },
              { name: "Addiction Test", path: "/user/assessment/test5" },
              { name: "PTSD Test", path: "/user/assessment/test6" },
            ].map((test, index) => (
              <Link to={test.path} key={index}>
                <motion.div
                  className="bg-black bg-opacity-30 px-20 py-2 gap-6 flex justify-center font-bold items-center text-white rounded-2xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h1 className="text-xl">{test.name}</h1>
                  <div className="border-2 border-white p-1 rounded-full px-2">
                    <i className="fa-solid fa-plus"></i>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </motion.div>
  );
};

export default SelfAssessment;
