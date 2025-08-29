// src/pages/UserProfile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../Components/Common Components/GoBackButton";


const UserProfile = () => {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#282928] flex flex-col items-center p-6">
  {/* Go Back Button */}
  <div className="w-full max-w-3xl">
    <GoBackButton />
  </div>

  {/* Profile Card */}
  <div className="w-full max-w-3xl bg-[#2A2A2A] shadow-2xl rounded-2xl overflow-hidden border border-gray-700/50 hover:shadow-green-500/20 hover:scale-[1.01] transition-transform duration-300 mt-4">
    {/* Cover Image */}
    <div className="relative h-48 bg-gradient-to-r from-green-400 to-green-600">
      <img
        src="https://www.rmcad.edu/wp-content/uploads/2024/12/shutterstock_2176161815-scaled.jpg"
        alt="Profile"
        className="w-full h-full object-cover"
      />
      {/* Profile Image */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
        <img
          src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?cs=srgb&dl=pexels-te-lensfix-380994-1371360.jpg&fm=jpg"
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
        />
      </div>
    </div>

    {/* User Info */}
    <div className="mt-20 text-center px-6">
      <h2 className="text-2xl font-semibold text-white">User Name</h2>
      <p className="text-gray-300 text-sm">user@email.com</p>

      {/* Stats / Quick Actions */}
      <div className="mt-6 flex justify-center space-x-8">
        <button onClick={()=>navigate('/editProfile')} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition cursor-pointer">
          Edit Profile
        </button>
        <button onClick={()=>navigate('/order-history')} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition cursor-pointer">
          Order History
        </button>
      </div>

      {/* Details Section */}
      <div className="mt-10 text-left space-y-4">
        <h3 className="text-lg font-semibold text-white">Account Details</h3>
        <div className="bg-[#272C36] text-white rounded-lg p-4 space-y-2">
          <p><span className="font-medium">Full Name:</span> User Name</p>
          <p><span className="font-medium">Email:</span> user@email.com</p>
          <p><span className="font-medium">Phone:</span> +91 9876543210</p>
          <p><span className="font-medium">Address:</span> Thrissur, Kerala</p>
        </div>
      </div>

      {/* Logout */}
      <div className="my-8">
        <button className="w-full bg-red-500 text-white py-2 rounded-lg shadow hover:bg-red-600 transition cursor-pointer">
          Logout
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default UserProfile;
