import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import CollectionsPage from './Pages/CollectionsPage'
import CollectionDetailPage from './Pages/CollectionDetailPage'
import Navbar from './Components/Layout Components/Navbar'
import Products from './Pages/Products'
import CartPage from './Pages/CartPage'
import Checkout from './Pages/Checkout'
import OrderHistory from './Pages/OrderHistory'
import OrderDetail from './Pages/OrderDetail'
import Wishlist from './Pages/WishList'
import SearchResults from './Pages/SearchResults'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import ProductManagement from './Pages/Admin/ProductManagement'
import AdminLayout from './Pages/Admin/AdminLayout'
import AddProduct from './Pages/Admin/AddProduct'
import OrderManagement from './Pages/Admin/OrderManagement'
import AdminOrderDetail from './Pages/Admin/AdminOrderDetail'
import AdminProductDetail from './Pages/Admin/AdminProductDetail'
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "./Firebase/firebaseConfig"; 
import { setUser, logout } from "./store/Slices/authSlice";
import { useEffect } from 'react'
import ProtectedRoute from './Components/Common Components/ProtectedRoute'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
  if (user) {
    await user.reload(); // ✅ force reload profile from Firebase

    dispatch(
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "User",
      })
    );
  } else {
    dispatch(logout());
  }
});


    return () => unsubscribe();
  }, [dispatch]);

  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/collections' element={<CollectionsPage />} />
        <Route path="/collections/:id" element={<CollectionDetailPage />} />
        <Route path="/product/:productId" element={<Products />} />
        <Route path='/cart' element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        {/* <Route path='/profile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} /> */}
        {/* <Route path='/editProfile' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} /> */}
        <Route path='/order-history' element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
        <Route path='/orders/:orderId' element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
        <Route path='/wishlist' element={<ProtectedRoute><Wishlist/></ProtectedRoute>} />
        <Route path='/search' element={<SearchResults/>} />



        {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="products/:productId" element={<AdminProductDetail />} />
        <Route path="products/add" element={<AddProduct mode="add"/>} />
        <Route path="products/edit/:productId" element={<AddProduct mode="edit"/>} />
        <Route path="orders" element={<OrderManagement/>} />
        <Route path="orders/:orderId" element={<AdminOrderDetail/>} />
      </Route>
      </Routes>

    </>
  )
}

export default App
