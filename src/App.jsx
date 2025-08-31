import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./Firebase/firebaseConfig";
import { setUser, logout } from "./store/Slices/authSlice";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CollectionsPage from "./Pages/CollectionsPage";
import CollectionDetailPage from "./Pages/CollectionDetailPage";
import Navbar from "./Components/Layout Components/Navbar";
import Products from "./Pages/Products";
import CartPage from "./Pages/CartPage";
import Checkout from "./Pages/Checkout";
import OrderHistory from "./Pages/OrderHistory";
import OrderDetail from "./Pages/OrderDetail";
import Wishlist from "./Pages/Wishlist";
import SearchResults from "./Pages/SearchResults";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ProductManagement from "./Pages/Admin/ProductManagement";
import AdminLayout from "./Pages/Admin/AdminLayout";
import AddProduct from "./Pages/Admin/AddProduct";
import OrderManagement from "./Pages/Admin/OrderManagement";
import AdminOrderDetail from "./Pages/Admin/AdminOrderDetail";
import AdminProductDetail from "./Pages/Admin/AdminProductDetail";

import ProtectedRoute from "./Components/Common Components/ProtectedRoute";
import AdminRoute from "./Components/Common Components/AdminRoute";
import UserRoute from "./Components/Common Components/UserRoute";
import EditProduct from "./Pages/Admin/EditProduct";
import Toast from "./Components/Common Components/Toast";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // 🔥 fetch Firestore doc for role & name
          const userRef = doc(db, "Users", user.uid);
          const snap = await getDoc(userRef);

          const data = snap.exists() ? snap.data() : {};
          dispatch(
            setUser({
              uid: user.uid,
              email: user.email,
              fullName: data.fullName || user.displayName || "User",
              role: data.role || "user", // 👈 ensures role persists
            })
          );
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      } else {
        dispatch(logout());
      }
      setCheckingAuth(false); // ✅ done checking
    });

    return () => unsubscribe();
  }, [dispatch]);

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" 
    // location.pathname.startsWith("/admin"); // ✅ no navbar for admin

  if (checkingAuth) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User */}
        <Route path="/" element={<UserRoute><Home /></UserRoute>} />
        <Route path="/collections" element={<UserRoute><CollectionsPage /></UserRoute>} />
        <Route path="/collections/:id" element={<UserRoute><CollectionDetailPage /></UserRoute>} />
        <Route path="/product/:productId" element={<UserRoute><Products /></UserRoute>} />
        <Route path="/cart" element={<ProtectedRoute><UserRoute><CartPage /></UserRoute></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><UserRoute><Checkout /></UserRoute></ProtectedRoute>} />
        <Route path="/order-history" element={<ProtectedRoute><UserRoute><OrderHistory /></UserRoute></ProtectedRoute>} />
        <Route path="/orders/:orderId" element={<ProtectedRoute><UserRoute><OrderDetail /></UserRoute></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><UserRoute><Wishlist /></UserRoute></ProtectedRoute>} />
        <Route path="/search" element={<UserRoute><SearchResults /></UserRoute>} />

        {/* Admin */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/:productId" element={<AdminProductDetail />} />
          <Route path="products/add" element={<AddProduct/>} />
          <Route path="products/edit/:productId" element={<EditProduct/>} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="orders/:orderId" element={<AdminOrderDetail />} />
        </Route>
      </Routes>
      <Toast/>
    </>
  );
};

export default App;
