
import { Navigate, Outlet } from "react-router-dom";

function TeacherAuthorise() {
  const userInfo = localStorage.getItem("UserData");
  const role = userInfo ? JSON.parse(userInfo).role : "";

  if (role !== "Admin-user") {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
}

export default TeacherAuthorise;
