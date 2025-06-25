// src/pages/DashboardRedirect.jsx
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardRedirect = () => {
  const { role, isLoading, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return; // wait for auth state to load

    if (!isAuthenticated) {
      navigate("/auth");
    } else if (role === "TPA") {
      navigate("/dashboard/tpa/home");
    } else if (role === "Provider") {
      navigate("/dashboard/provider/home");
    } else {
      navigate("/dashboard/provider/home");
    }
  }, [role, isLoading, isAuthenticated, navigate]);

  return null; // or a spinner while redirecting
};

export default DashboardRedirect;
