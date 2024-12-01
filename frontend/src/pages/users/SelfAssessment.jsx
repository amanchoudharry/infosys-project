import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Logo from '../../assets/infosys-main.png';
import Arrow from '../../assets/icons/right-arrow.png';
import Assessment from '../../assets/assessment.png';
import Footer from '../../components/Footer';

const SelfAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    Cookies.remove('role');
    Cookies.remove('session');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <motion.div 
      className="main"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 sticky bg-[#b7fdd3] top-0 z-50">
        <img src={Logo} alt="Logo" className="w-[7%]" />
        <ul className="flex items-center gap-5 bg-[#8abe9f] px-10 text-white p-3 rounded-full">
          {navItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <motion.li
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.li>
            </Link>
          ))}
        </ul>
        <div className="flex items-center gap-5">
          <motion.button
            className="flex items-center gap-3 border border-[#779F87] p-3 rounded-full text-[#6a8f79] hover:bg-[#779F87] hover:text-white transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Professional</span>
            <img src={Arrow} alt="Arrow" className="w-4" />
          </motion.button>
          <motion.button
            className="p-2 px-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </div>
      </nav>

      {/* Self Assessment Refer Section */}
      <motion.section 
        className="bg-[#71d699] mx-40 mt-10 shadow-xl shadow-[#4CAB72] rounded-2xl flex justify-center items-center"
        initial={{ x: "-100vw" }} 
        animate={{ x: 0 }} 
        transition={{ type: "spring", stiffness: 50 }}
      >
        <div className="m-10 pt-10 p-5 w-[70%] flex flex-col gap-10 py-20">
          <h1 className="text-5xl">
            Take a Mental Health <b>Self Assessment</b>
          </h1>
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
        <h1 className="text-5xl font-semibold">How Does it Work?</h1>
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
          <h1 className="text-5xl">
            Attend the <b>Self Assessment</b>
          </h1>
          <div className="grid grid-cols-2 grid-rows-4 gap-10">
            {[
              { name: "Depression Test", path: "/user/assessment/test1" },
              { name: "Anxiety Test", path: "/user/assessment/test2" },
              { name: "ADHD Test", path: "/user/assessment/test3" },
              { name: "Bipolar Test", path: "/user/assessment/test4" },
              { name: "Addiction Test", path: "/user/assessment/test5" },
              { name: "PTSD Test", path: "/user/assessment/test6" },
              { name: "Disorder Test", path: "/user/assessment/test7" },
              { name: "Postpartum Depression Test", path: "/user/assessment/test8" },
            ].map((test, index) => (
              <Link to={test.path} key={index}>
                <motion.div
                  className="bg-black bg-opacity-30 p-2 gap-4 flex justify-center font-bold items-center text-white rounded-2xl"
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
