// src/components/Common Components/StarRating.jsx
import React from "react";

const StarRating = ({ rating, setRating, readOnly = false }) => {
  const handleClick = (index) => {
    if (!readOnly && setRating) {
      setRating(index + 1);
    }
  };

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index)}
          className={`cursor-${readOnly ? "default" : "pointer"} text-2xl ${
            index < rating ? "text-yellow-400" : "text-gray-400"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
