// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { FiUsers, FiPackage, FiShoppingCart } from "react-icons/fi";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";
import StatsCard from "../../Components/Admin Component/StatsCard";
import RecentOrdersTable from "../../Components/Admin Component/RecentOrdersTable";

const AdminDashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  // Fetch counts and recent orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Users count
        const usersSnap = await getDocs(collection(db, "Users"));
        setUsersCount(usersSnap.size);

        // Products count
        const productsSnap = await getDocs(collection(db, "Products"));
        setProductsCount(productsSnap.size);

        // Orders count + recent orders
        const ordersRef = collection(db, "Orders");
        const ordersSnap = await getDocs(ordersRef);
        setOrdersCount(ordersSnap.size);

        // Recent orders (limit 5, ordered by timestamp if available)
        const q = query(ordersRef, orderBy("createdAt", "desc"), limit(5));
        const recentSnap = await getDocs(q);
        const ordersList = recentSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecentOrders(ordersList);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

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
          value={usersCount}
          color="bg-purple-600"
        />
        <StatsCard
          icon={FiPackage}
          title="Products"
          value={productsCount}
          color="bg-blue-600"
        />
        <StatsCard
          icon={FiShoppingCart}
          title="Orders"
          value={ordersCount}
          color="bg-green-600"
        />
      </div>

      {/* Recent Orders Table */}
      <RecentOrdersTable orders={recentOrders} />
    </>
  );
};

export default AdminDashboard;
