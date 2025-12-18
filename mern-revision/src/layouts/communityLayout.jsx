import { Outlet } from "react-router-dom";
import Mainnav from "../components/navbar/mainnav";
import StudentAuthorise from "../Authorization/StudentAuthorise";
import Navbar from "../components/Navbar";

export default function CommunitiyLayout() {
  return (
    <StudentAuthorise>
      <div className="h-screen flex bg-base-100 text-gray-200">
        <Mainnav />

        <main className="flex-1 overflow-y-auto px-6 py-6">
          <Outlet />
        </main>
      </div>
    </StudentAuthorise>
  );
}


