// src/pages/EditProfile.jsx
import React, { useState } from "react";
import GoBackButton from "../Components/Common Components/GoBackButton";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "User Name",
    email: "user@email.com",
    phone: "+91 9876543210",
    address: "Thrissur, Kerala",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    // 🔥 Later you’ll connect Firebase to actually update user details
  };

  return (
    <div className="min-h-screen bg-[#282928] flex flex-col items-center p-6">
  {/* Go Back Button */}
  <div className="w-full max-w-2xl">
    <GoBackButton />
  </div>

  {/* Edit Profile Card */}
  <div className="w-full max-w-2xl bg-[#2A2A2A] shadow-2xl rounded-2xl p-8 mt-4">
    <h2 className="text-2xl font-semibold text-white text-center mb-6">
      Edit Profile
    </h2>

    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="block text-gray-300 mb-2">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-300 mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-gray-300 mb-2">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-gray-300 mb-2">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Save Changes */}
      <button
        type="submit"
        className="w-full py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
      >
        Save Changes
      </button>
    </form>
  </div>
</div>

  );
};

export default EditProfile;
