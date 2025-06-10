import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${apiUrl}/authCheck`, {
          withCredentials: true, // ✅ ensure cookies are sent
        });
        if (res.data?.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate("/");
        }
      } catch (err) {
        console.error("Auth check failed:", err?.response?.data || err.message);
        setIsAuthenticated(false);
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate, apiUrl]);

  if (isAuthenticated === null) return <Loader />;

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
