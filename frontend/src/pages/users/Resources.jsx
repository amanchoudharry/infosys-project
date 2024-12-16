import React from 'react'
import { useLocation } from 'react-router-dom';
import Logo from '../../assets/infosys-main.png';
import Arrow from '../../assets/icons/right-arrow.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TreatmentAxiety from '../../components/resources/TreatmentAxiety';
import TreatmentDepression from '../../components/resources/TreatmenrDepression';
import NewsLetter from '../../components/NewsLetter';
import Footer from '../../components/Footer';
import BetterSleep from '../../components/resources/BetterSleep';
import Nutrition from '../../components/resources/Nutrition';
import Emotional from '../../components/resources/Emotional';
import Therapy from '../../components/resources/Theraphy';

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
const Resources = () => {
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
    window.location.reload();
  };
  const resourceList = [
    { name: "Treatment for Anxiety" },
    { name: "Treatment for Depression" },
    { name: "Treatment for ADHD" },
    { name: "Treatment for Bipolar" },
    { name: "Treatment for Addiction" },
    { name: "Treatment for PSTD" },
    { name: "Treatment for Disorder" },
    { name: "Treatment for Postmartum Depression" }
  ]



  return (
    <div className='main'>
      <motion.div
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

        {/*Resource Section 1 */}
        <motion.section
          className="bg-[#71d699] shadow-xl shadow-[#4CAB72] flex justify-center items-center"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="m-5 p-12 pt-5 flex flex-col justify-center items-center gap-5">
            <motion.h1 className="text-4xl font-bold text-center" variants={fadeInLeft}>
              Mental Well-Being
            </motion.h1>
            <motion.p className="text-2xl text-gray-800 font-medium" variants={fadeInLeft}>
              A Holistic Guide to Care
            </motion.p>
            <motion.div className='grid grid-rows-2 mt-5 grid-cols-3 gap-20'>
              {
                resourceList.map((item, index) => {
                  return (
                    <div className='bg-[#b7fdd3] font-bold p-5 py-7 text-center rounded-2xl text-lg shadow-md shadow-green-700'>
                      {item.name}
                    </div>
                  )
                })
              }
            </motion.div>
          </div>
        </motion.section>

        <motion.div className='w-[68%] -ml-24 p-5 pb-10'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-2xl ml-5 mt-5 font-semibold'>TREATMENT FOR ANXIETY</h1>
            <div className='border-t-2 border-gray-800 border-opacity-50  w-full h-1 text-center mt-2 ml-[70%]'></div>
            <TreatmentAxiety />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-2xl ml-20 mt-16 font-semibold'>TREATMENT FOR DEPRESSION</h1>
            <div className='border-t-2 border-gray-800 border-opacity-50  w-full h-1 text-center mt-2 ml-[70%]'></div>
            <TreatmentDepression />
          </div>
        </motion.div>


        <div className='mx-52'>
          <NewsLetter />
        </div>
        <motion.div className='w-[68%] -ml-24 p-5 pb-10'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-2xl -ml-28 mt-5 font-semibold'>Treatment for ADHD</h1>
            <div className='border-t-2 border-gray-800 border-opacity-50  w-full h-1 text-center mt-2 ml-[70%]'></div>
            <BetterSleep />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-2xl ml-20 mt-16 font-semibold'>Treatment for Bipolar</h1>
            <div className='border-t-2 border-gray-800 border-opacity-50  w-full h-1 text-center mt-2 ml-[70%]'></div>
            <Nutrition />
          </div>
        </motion.div>
        <motion.div className='w-[68%] -ml-24 p-5 pb-10'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-2xl ml-4 mt-5 font-semibold'>Treatment for Addiction</h1>
            <div className='border-t-2 border-gray-800 border-opacity-50  w-full h-1 text-center mt-2 ml-[70%]'></div>
            <Emotional />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-2xl -ml-44 mt-16 font-semibold'>Treatment for PSTD</h1>
            <div className='border-t-2 border-gray-800 border-opacity-50  w-full h-1 text-center mt-2 ml-[70%]'></div>
            <Therapy />
          </div>
        </motion.div>
      </motion.div>
      <motion.button
        className="px-3 p-2 flex ml-[40%] my-10 font-bold items-center justify-center gap-2 w-fit rounded-full text-white bg-[#356B4A] transition duration-500 transform hover:scale-105"
        variants={fadeInLeft}
      >
        <Link to={'/user/professional'}>
          <h1>Apply for Our Theraphy Sessions</h1>
        </Link>
      </motion.button>
      <Footer />
    </div>
  )
}

export default Resources
