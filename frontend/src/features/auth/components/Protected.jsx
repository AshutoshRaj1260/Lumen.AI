import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import LumenGlow from "../../shared/components/LumenGlow";
import "../../shared/style/loading.scss";

const Protected = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return (
      <div className="loading-container">
        <LumenGlow />

        <h3>Lumen.AI</h3>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default Protected;
