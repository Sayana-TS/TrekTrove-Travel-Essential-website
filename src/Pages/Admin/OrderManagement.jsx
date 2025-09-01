// src/pages/admin/OrderManagement.jsx
import React, { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/Slices/toastSlice"; // ✅ toast

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Orders"));
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore document ID
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders: ", error);
        dispatch(showToast({ message: "Failed to fetch orders", type: "error" }));
      }
    };

    fetchOrders();
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "Orders", id));
      setOrders((prev) => prev.filter((order) => order.id !== id));
      dispatch(showToast({ message: `Order #${id} deleted successfully!`, type: "success" }));
    } catch (error) {
      console.error("Error deleting order: ", error);
      dispatch(showToast({ message: `Failed to delete order #${id}`, type: "error" }));
    }
  };

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
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-700 hover:bg-[#383838] transition"
                >
                  <td className="px-6 py-4">#{order.id}</td>
                  <td className="px-6 py-4">{order.shippingInfo.fullName}</td>
                  <td className="px-6 py-4">{order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : "N/A"}</td>
                  <td className="px-6 py-4">₹{order.total}</td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      className="text-blue-400 hover:text-blue-500"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderManagement;
