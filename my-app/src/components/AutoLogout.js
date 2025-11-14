import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const expirationTime = localStorage.getItem("tokenExpiration");

      if (expirationTime && Date.now() > expirationTime) {
        logoutUser();
      }
    };

    const logoutUser = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tokenExpiration");
      navigate("/login"); // Redirect to login
    };

    // Check every 10 seconds
    const interval = setInterval(checkTokenExpiration, 10000);

    return () => clearInterval(interval);
  }, [navigate]);

  return null; // No UI needed
};

export default AutoLogout;
