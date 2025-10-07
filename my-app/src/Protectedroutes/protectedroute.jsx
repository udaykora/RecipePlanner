import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet ,useLocation} from "react-router-dom";

const ProtectRoutes = () => {
  const loginstatus = useSelector((state) => state.logindata.status);
  const location = useLocation();

  if (loginstatus) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace/>;
  }
};

export default ProtectRoutes;
