/* --- Route to main app only when user is authenticated --- */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Checking authentication...</p>;

  if (!user) return <Navigate to="/signin" replace />;

  return children;
};

export default PrivateRoute;
 