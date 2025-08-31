import React from "react";

const StatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-[#2A2A2A] rounded-xl shadow-md p-6 flex items-center justify-between">
      <div>
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <p className="text-2xl font-semibold text-white">{value}</p>
      </div>
      <div className={`text-3xl ${color}`}>
        <Icon />
      </div>
    </div>
  );
};


export default StatsCard;
