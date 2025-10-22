import { Navigate } from "react-router-dom";

function StudentAuthorise({ children }) {
  const userInfo = localStorage.getItem("UserData");

  let role = "";
  try {
    role = userInfo ? JSON.parse(userInfo).role : "";
  } catch (error) {
    console.error("Error parsing UserData from localStorage:", error);
  }

  if (role !== "normal-user") {
    return <Navigate to="/login" replace />;
  }

  // Return the wrapped children, not <Outlet />
  return <>{children}</>;
}

export default StudentAuthorise;
