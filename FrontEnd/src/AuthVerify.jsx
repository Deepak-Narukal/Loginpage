import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const RenderChild = ({ children }) => {
  const [IsAuth, setIsAuth] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/sendpost", { withCredentials: true })
      .then(() => setIsAuth(true))
      .catch((err) => {
        console.error(err);
        setIsAuth(false);
      });
  }, []);

  if (IsAuth === undefined) {
    return <div>Loading...</div>; // or return null for no UI
  }

  return IsAuth ? children : <Navigate to="/" replace />;
};
