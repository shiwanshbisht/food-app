import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";

const Privateroutes = () => {
  const { user } = useContext(UserContext);

  // Securely check if the global user context recognizes them as an admin
  return user?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default Privateroutes;