// AdminRoute.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user); // full user object
  const [checkingAuth, setCheckingAuth] = useState(true);

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL?.toLowerCase();

  useEffect(() => {
    // simulate waiting for auth state to load
    if (user !== undefined) {
      setCheckingAuth(false);
    }
  }, [user]);

  if (checkingAuth) {
    return <p className="text-center mt-10">Checking admin access...</p>;
  }

  if (user && user.email.toLowerCase() === adminEmail) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default AdminRoute;
