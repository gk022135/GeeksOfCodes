
import { Navigate, Outlet } from "react-router-dom";

function TeacherAuthorise({ children }) {
  const userInfo = localStorage.getItem("UserData");
  const role = userInfo ? JSON.parse(userInfo).role : "";

  if (role !== "Admin-user") {
    return <Navigate to="/admin-login" replace />;
  }

  return<>{children}</>;;
}

export default TeacherAuthorise;