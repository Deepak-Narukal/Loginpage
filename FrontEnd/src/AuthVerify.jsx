import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const RenderChild = ({ children }) => {
  const [IsAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth", { withCredentials: true })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (IsAuth === null) {
    return null; // or a loading spinner
  }

  return IsAuth ? children : <Navigate to="/login" replace />;
};
