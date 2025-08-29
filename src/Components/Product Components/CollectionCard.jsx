import React from "react";

const CollectionCard = ({ image, title, items }) => {
  return (
    <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover"
      />

      {/* Content */}
      <div className="px-4 py-3 text-center">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{items} items</p>
      </div>
    </div>
  );
};

export default CollectionCard;
