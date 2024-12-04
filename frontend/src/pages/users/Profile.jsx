import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const username = sessionStorage.getItem('username');
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${username}`)
      .then((response) => {
        setUserDetails(response.data);
        setUpdatedDetails(response.data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching user details:', error));
  }, [username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', updatedDetails.name);
    formData.append('email', updatedDetails.email);
    formData.append('about', updatedDetails.about);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    axios
      .put(`http://localhost:8080/api/users/${username}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        alert('Profile updated successfully!');
        setUserDetails(response.data);
      })
      .catch((error) => console.error('Error updating profile:', error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {loading ? (
        <div className="text-xl font-bold text-gray-700">Loading...</div>
      ) : (
        <form
          className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Edit Profile
          </h2>
          {userDetails.profileImage && (
            <img
              src={`http://localhost:8080/uploads/${userDetails.profileImage}`}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
          )}
          <div>
            <label className="block text-gray-600 font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedDetails.name || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={updatedDetails.email || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-medium"
              htmlFor="about"
            >
              About Me
            </label>
            <textarea
              id="about"
              name="about"
              value={updatedDetails.about || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-medium"
              htmlFor="profileImage"
            >
              Profile Photo
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handleImageChange}
              className="w-full p-2 border rounded focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded transition hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
