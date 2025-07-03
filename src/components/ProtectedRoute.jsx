import { Navigate } from "react-router-dom";
import { sessionAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { session, loading } = sessionAuth();

  if (loading) return <p>Cargando...</p>;

  return session ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
