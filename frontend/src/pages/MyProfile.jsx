import React, { useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "basha",
    image: assets.user_icon, // Use user icon instead of profile_pic
    email: 'example@gmail.com',
    phone: '+91 1234567890',
    address: {
      line1: 'Benz Circle',
      line2: 'Vijayawada AP 518510'
    },
    gender: 'Male',
    dob: '2000-01-20',
    age: 25,
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-2xl mx-auto bg-green-50 shadow-lg rounded-2xl p-6 mt-2 transition-all duration-300 ease-in-out">
      <div className="flex flex-col items-center gap-4">
        <img
          src='/images/user.png'
          alt="User Icon"
          className="w-32 h-32 rounded-full shadow-md border-4 object-cover bg-green-600 "
        />

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
          onClick={() => setIsEdit(!isEdit)}
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
                  {userData.address.line1}<br />
                  {userData.address.line2}
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
