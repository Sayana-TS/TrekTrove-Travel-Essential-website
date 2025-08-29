// src/layouts/AdminLayout.jsx
import React, { useState } from "react";
import {
  FiUsers,
  FiPackage,
  FiShoppingCart,
  FiLogOut,
  FiMenu,
  FiChevronLeft,
} from "react-icons/fi";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // detect active tab from path
  const activePath = location.pathname;

  return (
    <div className="flex h-[calc(100vh-5.5rem)] bg-[#282928] text-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-[#2A2A2A] transition-all duration-300 flex flex-col shadow-lg h-[calc(100vh-5.5rem)]`}
      >
        {/* Header + Collapse Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isCollapsed && (
            <span className="text-xl font-bold tracking-wide">Admin Panel</span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-[#3a3a3a]"
          >
            {isCollapsed ? <FiMenu size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => navigate("/admin")}
            className={`flex items-center gap-3 w-full p-3 rounded-xl transition ${
              activePath === "/admin"
                ? "bg-green-600 text-white"
                : "hover:bg-[#3a3a3a]"
            }`}
          >
            <FiUsers size={20} />
            {!isCollapsed && <span>Dashboard</span>}
          </button>
          <button
            onClick={() => navigate("/admin/products")}
            className={`flex items-center gap-3 w-full p-3 rounded-xl transition ${
              activePath === "/admin/products"
                ? "bg-green-600 text-white"
                : "hover:bg-[#3a3a3a]"
            }`}
          >
            <FiPackage size={20} />
            {!isCollapsed && <span>Products</span>}
          </button>
          <button
            onClick={() => navigate("/admin/orders")}
            className={`flex items-center gap-3 w-full p-3 rounded-xl transition ${
              activePath === "/admin/orders"
                ? "bg-green-600 text-white"
                : "hover:bg-[#3a3a3a]"
            }`}
          >
            <FiShoppingCart size={20} />
            {!isCollapsed && <span>Orders</span>}
          </button>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-[#3a3a3a]">
            <FiLogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet /> {/* renders the child page (dashboard/products/orders) */}
      </main>
    </div>
  );
};

export default AdminLayout;
