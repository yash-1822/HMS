import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';


const MyProfile = () => {
  const [userData, setUserData] = useState({
    // name: "basha",
    // image: assets.user_icon, // Use user icon instead of profile_pic
    // email: 'example@gmail.com',
    // phone: '+91 1234567890',
    // address: 'srikakulam',
    // gender: 'Male',
    // dob: '2000-01-20',
    // age: 25,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({});

  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (showModal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Clean up on unmount just in case
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showModal]);


  const handleProfileImageChange = async (event) => {
    console.log("file si")
    const file = event.target.files[0];
    
    if (!file) return;
  
    const imageUrl = await uploadToCloudinary(file);
    if (!imageUrl) return;
  
    // Update state immediately for UI
    setUserData(prev => ({ ...prev, image: imageUrl }));
  
    // Send to backend
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.post(
        'https://hms-backend-d7jp.onrender.com/patient/updateUserImage',
        { imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      console.log("Image updated in backend:", res.data);
    } catch (err) {
      console.error("Error updating backend image:", err);
    }
  };

  console.log("userdata us",userData)

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    console.log("file is",file)
    formData.append('file', file);
    formData.append('upload_preset', 'doctors'); // replace this
  
    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dgelue5vg/image/upload',
       formData
      );
      return res.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return null;
    }
  };
  
  


  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');

      const res = await axios.post('https://hms-backend-d7jp.onrender.com/patient/updateUserDetails', {
        email: userData.email,
        phone: userData.phone,
        gender: userData.gender,
        age: userData.age,
        address: userData.address, // send as object with line1 & line2
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      console.log('Update success:', res.data);

      setShowModal(false); // close modal after success
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };




  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('authToken'); // or however you store it

        const res = await axios.get('https://hms-backend-d7jp.onrender.com/patient/getUserDetailsWhileLogin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedData = res.data

        setData(res.data);

        setUserData({
          name: fetchedData.name || '',
          image: fetchedData.imageUrl || '',
          email: fetchedData.email || '',
          phone: fetchedData.phone || '',
          address: fetchedData.address || '',
          gender: fetchedData.gender || 'Male',
          age: fetchedData.age || 22,
        });


      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchDetails();
  }, []);


  console.log("patient data in profile is:", data)

  return (
    <div className="max-w-2xl mx-auto bg-green-50 shadow-lg rounded-2xl p-6 mt-2 transition-all duration-300 ease-in-out">


      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fade-in-down">
            <h2 className="text-xl font-bold mb-4 text-green-700">Edit Profile</h2>

            <div className="space-y-4">

              <div>
                <label className="text-sm text-green-600">Name:</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-green-300 px-3 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="text-sm text-green-600">Email ID:</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full border border-green-300 px-3 py-2 rounded-md"
                />
              </div>


              <div>
                <label className="text-sm text-green-600">Phone:</label>
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full border border-green-300 px-3 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="text-sm text-green-600">Gender:</label>
                <select
                  value={userData.gender}
                  onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full border border-green-300 px-3 py-2 rounded-md"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-green-600">Age:</label>
                <input
                  type="number"
                  value={userData.age}
                  onChange={(e) => setUserData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full border border-green-300 px-3 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="text-sm text-green-600">Address:</label>
                <input
                  type="text"
                  value={userData.address}
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))}
                  className="w-full border border-green-300 px-3 py-2 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>


              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>

            </div>
          </div>
        </div>
      )}




      <div className="flex flex-col items-center gap-4">

<div className="relative w-24 h-24 cursor-pointer group">
  {/* Hidden File Input */}

<input
  type="file"
  accept="image/*"
  id="profileImageInput"
  onChange={handleProfileImageChange}
  className="hidden"
/>


  {/* Clickable Image (Label) */}
  <label htmlFor="profileImageInput">
    <img
      src={userData.image}
      // alt="User Icon"
      className="w-full h-full rounded-full shadow-md border-4 object-cover bg-green-600"
    />
  </label>

  {/* Plus Icon (Also Label) */}
  <label
    htmlFor="profileImageInput"
    className="absolute bottom-3 right-3 bg-white hover:bg-green-700 text-black w-5 h-5 font-extrabold flex items-center justify-center rounded-full  text-[20px]"
    title="Change profile picture"
  >
    +
  </label>
</div>



        {
          isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
              className="text-xl font-semibold border-b-2 border-green-400 focus:outline-none px-2 py-1 transition-all duration-200"
            />
          ) : (
            <p className="text-2xl font-bold text-green-800">{userData.name}</p>
          )
        }

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
        >
          {isEdit ? "Save" : "Edit Profile"}
        </button>
      </div>

      <hr className="my-6 border-green-200" />

      <div>
        <p className="text-lg font-semibold text-green-700 mb-3">Contact Information</p>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-green-600">Email ID:</p>
            <p className="text-gray-800">{userData.email}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-green-600">Phone:</p>
            {
              isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full border border-green-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              ) : (
                <p className="text-gray-800">{userData.phone}</p>
              )
            }
          </div>

          <div>
            <p className="text-sm font-medium text-green-600">Gender:</p>
            {
              isEdit ? (
                <select
                  value={userData.gender}
                  onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full border border-green-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <p className="text-gray-800">{userData.gender}</p>
              )
            }
          </div>

          <div>
            <p className="text-sm font-medium text-green-600">Age:</p>
            {
              isEdit ? (
                <input
                  type="number"
                  value={userData.age}
                  onChange={e => setUserData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full border border-green-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              ) : (
                <p className="text-gray-800">{userData.age}</p>
              )
            }
          </div>

          <div>
            <p className="text-sm font-medium text-green-600">Address:</p>
            {
              isEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={userData.address.line1}
                    onChange={e => setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }
                    }))}
                    className="w-full border border-green-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  />
                  <input
                    type="text"
                    value={userData.address.line2}
                    onChange={e => setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }
                    }))}
                    className="w-full border border-green-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  />
                </div>
              ) : (
                <p className="text-gray-800">
                  {userData.address}<br />
                </p>


              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
