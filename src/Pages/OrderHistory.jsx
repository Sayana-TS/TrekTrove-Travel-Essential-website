import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../Components/Common Components/GoBackButton";
import { db } from "../Firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        // Query orders for current user
        const q = query(
          collection(db, "Orders"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="p-6 min-h-screen bg-[#282928] text-white">
      <GoBackButton />
      <h1 className="text-3xl font-bold mb-6">Order History</h1>

      {loading ? (
        <p className="text-center text-gray-400 mt-10">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">
          You have no orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#2A2A2A] p-6 rounded-2xl shadow-lg border border-gray-700"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold">Order ID: {order.id}</p>
                <p className="text-gray-400">
                  {order.createdAt?.toDate
                    ? order.createdAt.toDate().toLocaleDateString()
                    : ""}
                </p>
              </div>

              {/* Status Badge */}
              <span
                className={`inline-block px-3 py-1 text-sm rounded-full mb-4 font-semibold
                  ${
                    order.status === "delivered"
                      ? "bg-green-500/20 text-green-400"
                      : order.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
              >
                {order.status}
              </span>

              {/* Products */}
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-[#3A3A3A] transition"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer: Total + View Details */}
              <div className="flex justify-between items-center mt-6">
                <p className="font-bold text-lg">
                  Total: $
                  {order.items
                    ?.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
                <button
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className="px-4 py-2 bg-[#91b474] hover:bg-[#7aa45f] text-black font-semibold rounded-lg transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
