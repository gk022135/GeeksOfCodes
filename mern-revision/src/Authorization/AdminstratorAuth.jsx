import { Navigate, Outlet } from "react-router-dom";

function AdminstratorAuth() {
  const userInfo = localStorage.getItem("UserData");
  const role = userInfo ? JSON.parse(userInfo).data.role : "";
  

  if (role !== "Administrator") {
    return <Navigate to="/administrator-login" replace />;
  }

  return <Outlet />;
}

export default AdminstratorAuth;