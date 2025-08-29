// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();

  // If user is not logged in, show friendly message + actions
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#282928] p-6">
        <div className="max-w-md w-full bg-[#1e1e1e] rounded-xl p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-2">Please log in to continue</h2>
          <p className="text-gray-400 mb-6">
            You must be signed in to access this page.
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/login", { state: { from: location.pathname } })}
              className="bg-[#606b57] text-white px-4 py-2 rounded-lg shadow hover:scale-[1.02] transition"
            >
              Go to Login
            </button>

            <button
              onClick={() => navigate("/")}
              className="bg-transparent border border-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If user exists, render the requested page
  return children;
};

export default ProtectedRoute;
