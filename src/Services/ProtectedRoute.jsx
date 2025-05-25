import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = useSelector((state) => state.jwt);
  if (!token) {
    return <Navigate to="/login" />;
  }

  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch (e) {
    // If token is invalid, redirect to login
    return <Navigate to="/unauthorized" />;
  }

  if (allowedRoles && !allowedRoles.includes(decodedToken.accountType)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
