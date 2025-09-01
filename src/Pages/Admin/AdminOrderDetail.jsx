import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoBackButton from "../../Components/Common Components/GoBackButton";
import { db } from "../../Firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/Slices/toastSlice";

const AdminOrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, "Orders", orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          setOrder({ id: orderSnap.id, ...orderSnap.data() });
        } else {
          console.error("Order not found");
          dispatch(showToast({ message: "Order not found", type: "error" }));
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        dispatch(showToast({ message: "Failed to fetch order details", type: "error" }));
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, dispatch]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setOrder((prev) => ({ ...prev, status: newStatus }));
  };

  const handleUpdate = async () => {
    try {
      const orderRef = doc(db, "Orders", orderId);
      await updateDoc(orderRef, { status: order.status });
      dispatch(showToast({ message: `Order status updated to: ${order.status}`, type: "success" }));
    } catch (error) {
      console.error("Error updating status:", error);
      dispatch(showToast({ message: "Failed to update order status", type: "error" }));
    }
  };

  if (loading) return <p className="text-gray-400">Loading order...</p>;
  if (!order) return <p className="text-red-400">Order not found</p>;

  return (
    <>
      <GoBackButton />
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
        Order Details
      </h1>

      {/* Order Info */}
      <div className="bg-[#2A2A2A] p-6 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div><span className="font-semibold">Order ID:</span> {order.id}</div>
        <div><span className="font-semibold">Customer:</span> {order.shippingInfo?.fullName}</div>
        <div><span className="font-semibold">Email:</span> {order.shippingInfo?.email}</div>
        <div><span className="font-semibold">Date:</span> 
          {order.createdAt?.toDate
            ? order.createdAt.toDate().toLocaleString()
            : "N/A"}
        </div>
        <div className="md:col-span-2"><span className="font-semibold">Address:</span> {order.shippingInfo?.address}</div>
      </div>

      {/* Items Table */}
      <div className="bg-[#2A2A2A] p-6 rounded-2xl shadow-lg mb-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Ordered Items</h2>
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#333] text-gray-300">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item, idx) => (
              <tr
                key={item.id || idx}
                className={`border-b border-gray-700 transition ${
                  idx % 2 === 0 ? "bg-[#2F2F2F]" : "hover:bg-[#383838]"
                }`}
              >
                <td className="px-6 py-4">{item.name || item.title}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">₹{item.price}</td>
                <td className="px-6 py-4">₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center">
          <p className="font-semibold text-lg">Total: ₹{order.total}</p>
          <p className={`font-semibold ${order.paymentStatus === "Paid" ? "text-green-400" : "text-red-400"}`}>
            Payment: {order.paymentMethod}
          </p>
        </div>
      </div>

      {/* Status Update */}
      <div className="bg-[#2A2A2A] p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>
        <select
          value={order.status}
          onChange={handleStatusChange}
          className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-green-500 transition mb-4"
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button
          onClick={handleUpdate}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105"
        >
          Update Status
        </button>
      </div>
    </>
  );
};

export default AdminOrderDetail;
