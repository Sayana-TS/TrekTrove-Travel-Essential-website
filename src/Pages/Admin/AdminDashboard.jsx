// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { FiUsers, FiPackage, FiShoppingCart } from "react-icons/fi";
import StatsCard from "../../Components/Admin Component/StatsCard";
import RecentOrdersTable from "../../Components/Admin Component/RecentOrdersTable";

const AdminDashboard = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-green-400 mb-6">
        Admin Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatsCard
          icon={FiUsers}
          title="Users"
          value="1,200"
          color="bg-purple-600"
        />
        <StatsCard
          icon={FiPackage}
          title="Products"
          value="320"
          color="bg-blue-600"
        />
        <StatsCard
          icon={FiShoppingCart}
          title="Orders"
          value="540"
          color="bg-green-600"
        />
      </div>

      {/* Recent Orders Table */}
      <RecentOrdersTable />
    </>
  );
};

export default AdminDashboard;
