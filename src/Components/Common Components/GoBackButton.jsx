// src/components/GoBackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <button
        onClick={() => navigate(-1)}
        className="
          flex items-center gap-2 mb-6
          bg-gradient-to-r from-green-500 to-green-600
          text-white px-5 py-2 rounded-xl
          shadow-lg hover:shadow-2xl
          transform hover:-translate-y-1 hover:scale-105
          transition-all duration-300
        "
      >
        <ArrowLeft size={20} className="stroke-2" />
        <span className="font-semibold text-sm md:text-base">Go Back</span>
      </button>
    </div>
  );
};

export default GoBackButton;
