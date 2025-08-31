// src/pages/OrderDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../Firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { showToast } from "../store/Slices/toastSlice";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, "Orders", orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          setOrder({ id: orderSnap.id, ...orderSnap.data() });
        } else {
          setOrder(null);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#282928] text-white flex justify-center items-center">
        <p>Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#282928] text-white p-6 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <button
          onClick={() => navigate("/order-history")}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const handleCancelOrder = async (orderId) => {
    try {
      const orderRef = doc(db, "Orders", orderId);
      const orderSnap = await getDoc(orderRef);

      if (orderSnap.exists()) {
        const currentStatus = orderSnap.data().status;

        if (currentStatus === "Delivered") {
          dispatch(
            showToast({
              message:
                "This order has already been delivered and cannot be cancelled.",
              type: "error",
            })
          );
          return;
        }

        await updateDoc(orderRef, {
          status: "Cancelled",
        });

        setOrder((prev) => ({ ...prev, status: "Cancelled" }));

        dispatch(
          showToast({
            message: "Your order has been cancelled successfully.",
            type: "success",
          })
        );
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      dispatch(
        showToast({
          message: "Something went wrong while cancelling the order.",
          type: "error",
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#282928] text-white p-6">
      <button
        onClick={() => navigate("/order-history")}
        className="mb-6 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
      >
        ← Back to Orders
      </button>

      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      <div className="bg-[#2A2A2A] p-6 rounded-2xl shadow-md space-y-4">
        {/* Order Info */}
        <div className="flex justify-between">
          <p className="font-semibold">Order ID: {order.id}</p>
          <p className="text-gray-400">
            {order.createdAt?.toDate().toLocaleDateString()}
          </p>
        </div>

        <p
          className={`font-semibold ${
            order.status === "Delivered"
              ? "text-green-400"
              : order.status === "Pending"
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          Status: {order.status}
        </p>

        {/* Products */}
        <div className="space-y-4 mt-4">
          {order.items.map((p, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 border-b border-gray-700 pb-4"
            >
              <img
                src={p.image || "/placeholder.png"}
                alt={p.name}
                className="w-24 h-24 rounded-lg"
              />
              <div className="flex-1">
                <p className="font-semibold">{p.name}</p>
                <p className="text-gray-400">Quantity: {p.quantity}</p>
              </div>
              <p className="font-semibold">
                ${(p.price * p.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <p className="mt-4 text-right font-bold text-lg">
          Total: ${order.total.toFixed(2)}
        </p>

        {/* Shipping + Payment */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* Shipping Info */}
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#262626] p-6 rounded-2xl shadow-lg border border-gray-800">
            <h3 className="text-lg font-semibold mb-5 flex items-center gap-2 text-yellow-400">
              📦 Shipping Info
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Address</span>
                <span className="font-medium text-white">
                  {order.shippingInfo?.address || "N/A"}
                </span>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">City</span>
                <span className="font-medium text-white">
                  {order.shippingInfo?.city || "N/A"}
                </span>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Zip</span>
                <span className="font-medium text-white">
                  {order.shippingInfo?.zip || "N/A"}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Phone</span>
                <span className="font-medium text-white">
                  {order.shippingInfo?.phone || "N/A"}
                </span>
              </li>
            </ul>
          </div>

          {/* Payment Method */}
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#262626] p-6 rounded-2xl shadow-lg border border-gray-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-5 flex items-center gap-2 text-yellow-400">
                💳 Payment Method
              </h3>
              <div className="flex items-center justify-between bg-[#2F2F2F] p-3 rounded-lg border border-gray-700">
                <span className="text-gray-400">Method</span>
                <span className="text-white font-medium capitalize">
                  {order.paymentMethod}
                </span>
              </div>
            </div>

            {/* Cancel Order Button */}
            <button
              onClick={() => handleCancelOrder(order.id)}
              className="mt-6 w-full py-2 cursor-pointer px-4 bg-gradient-to-r from-red-600 to-red-700 hover:opacity-90 transition rounded-lg font-semibold text-white shadow-md"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
