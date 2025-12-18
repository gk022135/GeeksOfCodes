import { Outlet } from "react-router-dom";
import TeacherNavbar from "../components/navbar/teacherNavbar";
import TeacherAuthorise from "../Authorization/TeacherAuthorise";

export default function TeacherLayout() {
  return (
    <TeacherAuthorise>
      <div className="h-screen bg-base-100 text-gray-200">

        {/* Fixed Navbar (top + sidebar handled inside) */}
        <TeacherNavbar />

        {/* 
          Main Content Area
          - pt-16  → top navbar height (mobile + desktop)
          - lg:pl-64 → left sidebar width (desktop only)
        */}
        <main
          className="
            pt-16
            lg:pl-64
            h-screen
            overflow-y-auto
            px-4
            sm:px-6
            lg:px-8
            pb-6
          "
        >
          <Outlet />
        </main>

      </div>
    </TeacherAuthorise>
  );
}
