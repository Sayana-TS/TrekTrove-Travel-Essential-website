// src/pages/admin/OrderManagement.jsx
import React from "react";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const orders = [
  { id: 101, customer: "John Doe", date: "2025-08-20", total: 230, status: "Pending" },
  { id: 102, customer: "Alice Smith", date: "2025-08-21", total: 120, status: "Shipped" },
  { id: 103, customer: "Michael Lee", date: "2025-08-22", total: 90, status: "Delivered" },
];

const OrderManagement = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-400">Order Management</h1>
      </div>

      {/* Orders Table */}
      <div className="bg-[#2a2a2a] shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#333] text-gray-300">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-700 hover:bg-[#383838] transition"
              >
                <td className="px-6 py-4">#{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">${order.total}</td>
                <td className="px-6 py-4">{order.status}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                    className="text-blue-400 hover:text-blue-500"
                  >
                    <Eye size={18} />
                  </button>
                  <button className="text-red-400 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderManagement;
