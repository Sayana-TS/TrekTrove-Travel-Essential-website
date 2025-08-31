import React from "react";
import { useNavigate } from "react-router-dom";
import { User, ShoppingBag, LogOut, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import { logout } from "../../store/Slices/authSlice";
import { showToast } from "../../store/Slices/toastSlice"; // ✅ toast

const UserSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  if (user?.role === "admin") return null; // hide sidebar for admin

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      dispatch(showToast({ message: "Logged out successfully!", type: "success" }));
      navigate("/login");
      onClose();
    } catch (error) {
      console.error("Logout error:", error.message);
      dispatch(showToast({ message: "Logout failed. Try again.", type: "error" }));
    }
  };

  const initials = user?.fullName
    ? user.fullName.charAt(0).toUpperCase()
    : "U";

  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-[#282928] backdrop-blur-xl border-l border-gray-800 text-white shadow-2xl transform transition-transform duration-500 z-50 rounded-l-2xl ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl transition"
      >
        ✕
      </button>

      <div className="p-6 mt-10">
        <div className="mb-10 text-center">
          <div className="relative w-28 h-28 mx-auto rounded-full p-[4px] bg-gradient-to-tr from-green-400 to-green-600 shadow-lg shadow-green-700/30">
            <div className="w-full h-full rounded-full bg-[#1f201f] flex items-center justify-center text-4xl font-extrabold text-white">
              {initials}
            </div>
          </div>
          <h2 className="mt-5 text-2xl font-semibold tracking-wide text-white">
            {user?.fullName || "User"}
          </h2>
          <p className="text-sm text-gray-400">
            {user?.email || "No email"}
          </p>
        </div>

        <ul className="space-y-3 text-base font-medium">
          <li
            onClick={() => {
              navigate("/order-history");
              onClose();
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-500/20 hover:text-green-400 cursor-pointer transition transform hover:translate-x-1 shadow-sm hover:shadow-green-600/30"
          >
            <ShoppingBag size={20} />
            Order History
          </li>
          <li
            onClick={() => {
              navigate("/wishlist");
              onClose();
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-500/20 hover:text-green-400 cursor-pointer transition transform hover:translate-x-1 shadow-sm hover:shadow-green-600/30"
          >
            <Heart size={20} />
            WishList
          </li>
        </ul>

        {user ? (
          <button
            onClick={handleLogout}
            className="mt-12 w-full bg-gradient-to-r from-green-500 to-green-700 py-3 rounded-xl text-white font-semibold hover:scale-[1.03] active:scale-95 transition cursor-pointer shadow-xl shadow-green-800/40 flex items-center justify-center gap-2"
          >
            <LogOut size={18} /> Logout
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              onClose();
            }}
            className="mt-12 w-full bg-gradient-to-r from-green-500 to-green-700 py-3 rounded-xl text-white font-semibold hover:scale-[1.03] active:scale-95 transition cursor-pointer shadow-xl shadow-green-800/40 flex items-center justify-center gap-2"
          >
            <User size={18} /> Login
          </button>
        )}
      </div>
    </div>
  );
};

export default UserSidebar;
