import { Navigate } from "react-router-dom";
import { sessionAuth } from "../context/AuthContext";

function PublicRoute({ children }) {
  const { session, loading } = sessionAuth();

  if (loading) return <p>Cargando...</p>;

  return session ? <Navigate to="/" /> : children;
}

export default PublicRoute;
