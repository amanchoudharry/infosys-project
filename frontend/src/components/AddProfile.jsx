import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProfile = () => {
  const userId = sessionStorage.getItem('userId');
  const [profileImage, setProfileImage] = useState(null);

  // Fetch the current profile image
  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${userId}`)
      .then((response) => {
        setProfileImage(response.data.profileImage);
      })
      .catch((error) => console.error('Error fetching profile image:', error));
  }, [userId]);

  // Handle image selection and upload
  const handleAddImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      axios.post(`http://localhost:8080/api/users/${userId}/upload-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(() => {
        const reader = new FileReader();
        reader.onload = () => {
          setProfileImage(reader.result); // Update the frontend to show the uploaded image
          window.location.reload();
        };
        reader.readAsDataURL(file);
      })
      .catch((error) => console.error('Error uploading image:', error));
    }
  };

  return (
    <div>
      <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center relative">
        {profileImage ? (
          <img
            src={`data:image/png;base64,${profileImage}`}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <i className="fa-regular fa-user text-white text-4xl"></i>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleAddImg}
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="px-2 rounded-full cursor-pointer bg-black border absolute bottom-0 right-0"
        >
          <i className="fa-solid fa-plus text-[10px] text-white font-bold "></i>
        </label>
      </div>
    </div>
  );
};

export default AddProfile;
