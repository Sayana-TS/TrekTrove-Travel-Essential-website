// src/components/Common Components/SearchBar.jsx
import React, { useState } from "react";
import { FiX, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ show, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
    onClose(); // close the search bar
  };

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 transition-all duration-500
      ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}
    >
      {/* Search Box */}
      <div className="relative w-full max-w-2xl mt-32 px-6">
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-gradient-to-r from-[#1F1F1F] to-[#2A2A2A] rounded-2xl shadow-2xl border border-gray-700 px-5 py-4"
        >
          <FiSearch className="text-gray-400 text-xl mr-3" />
          <input
            type="text"
            placeholder="Search travel essentials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none text-lg text-white placeholder-gray-400"
          />
        </form>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-4 text-3xl text-gray-300 hover:text-white transition"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
