import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import TeacherAuthorise from "../Authorization/TeacherAuthorise";

export default function StudentLayout() {
  return (
    <TeacherAuthorise>
      <div className="flex h-screen bg-base-100 text-gray-200 overflow-hidden">
        {/* Fixed Navbar */}
        <div className="fixed top-0 z-20 w-full">
          <Navbar />
        </div>

        {/* Scrollable content */}
        <main className="flex-1 h-full overflow-y-auto mt-16">
          <Outlet /> {/* Protected pages render here */}
        </main>
      </div>
    </TeacherAuthorise>
  );
}
