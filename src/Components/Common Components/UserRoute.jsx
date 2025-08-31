// Components/Common Components/UserRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default UserRoute;
