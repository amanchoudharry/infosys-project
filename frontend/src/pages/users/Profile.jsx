import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/infosys-main.png';
import Arrow from '../../assets/icons/right-arrow.png';
import { toast } from 'react-toastify';
import AddProfile from '../../components/AddProfile';
import AppointmentData from '../../components/AppointmentData';
import SessionData from '../../components/SessionData';
import BookmarkResources from '../../components/BookmarkResources';

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username') || 'USERNAME';
  const userId = sessionStorage.getItem('userId');

  const [activeTab, setActiveTab] = useState('User  Information');
  const [userData, setUserData] = useState(null);
  const [isEditCardVisible, setEditCardVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dob: '',
    gender: '',
    email: '',
    summary: '',
  });

  const navItems = [
    { name: 'Home', path: '/dashboard/user' },
    { name: 'About', path: '/user/about' },
    { name: 'Resources', path: '/user/resources' },
    { name: 'Self Assessment', path: '/user/assessment' },
    { name: 'Emergency', path: '/user/emergency' },
  ];

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  // Fetch user data from the backend
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setFormData({
          name: response.data.name,
          age: response.data.age,
          dob: response.data.dob,
          gender: response.data.gender,
          email: response.data.email,
          summary: response.data.summary,
        });
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [userId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated profile data
  const handleFormSubmit = () => {
    axios
      .put(`http://localhost:8080/api/users/${userId}`, formData)
      .then((response) => {
        setUserData(response.data);
        setEditCardVisible(false);
        toast.success("Profile Edited Successfully!");
      })
      .catch((error) => console.error('Error updating user data:', error));
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
      className="main bg-[#b7fdd3] min-h-screen"
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

      <div className="flex mt-10">
        {/* Sidebar */}
        <aside className="w-[30%] mt-16 h-screen fixed top-0 left-0 flex flex-col justify-evenly p-5 border-r-2 border-black">
          <div>
            <div className="flex flex-col items-center relative mb-10">
              <AddProfile />
              <h2 className="mt-4 font-bold">{username}</h2>
            </div>
            <ul className="flex flex-col gap-5">
              {['User  Information', 'Appointments', 'Sessions'].map((tab) => (
                <li
                  key={tab}
                  className={`p-3 rounded-full cursor-pointer ${activeTab === tab ? 'bg-[#71d699] text-white' : 'text-black hover:bg-[#71d699]'
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
          <div onClick={() => setActiveTab('BookmarkResource')} className='bg-[#42a168] text-white p-2 px-3 rounded-xl flex justify-center items-center'>
            <button className='font-bold'>Bookmarked Resources</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-[70%] ml-[30%] p-10">
          {activeTab === 'User  Information' && (
            <div>
              <h1 className="text-4xl font-bold mb-5 text-center">User  Information</h1>
              <p className="font-semibold text-2xl">Your Profile</p>
              <div className="border-t-2 border-black mt-2 mb-5"></div>
              {userData && (
                <div>
                  <div className='flex flex-col gap-5'>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Age:</strong> {userData.age}</p>
                    <p><strong>Date of Birth:</strong> {userData.dob}</p>
                    <p><strong>Gender:</strong> {userData.gender}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                  </div>
                  <div className='flex flex-col gap-3 mt-5'>
                    <p className="mt-2 text-2xl"><strong>About You</strong></p>
                    <div className="border-t-2 border-black "></div>
                    <p className='italic'>{userData.summary}</p>
                  </div>
                  <button
                    onClick={() => setEditCardVisible(true)}
                    className="mt-5 px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          )}
          {activeTab === 'Appointments' && (
            <AppointmentData />
          )}

          {activeTab === 'Sessions' && (
            <SessionData />
          )}

          {activeTab === 'BookmarkResource' && (
            <BookmarkResources />
          )}
        </main>
      </div>

      {/* Edit Card */}
      {isEditCardVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-1/3 p-5 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age"
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                placeholder="Gender"
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border border-gray-300 p-2 rounded"
              />
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                placeholder="About You"
                className="border border-gray-300 p-2 rounded"
              ></textarea>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditCardVisible(false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleFormSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;