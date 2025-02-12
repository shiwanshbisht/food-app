import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Privateroutes = () => {
  let auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to="/admin" />;
};

export default Privateroutes;