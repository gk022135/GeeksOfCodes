import { useEffect, useState } from "react";
import Create_class from '../Teacher-pages/Create_Class';
import All_Class_adm from "./All_Class_Ad";
import DeleteUser from "./Delete_Class";
import Attendance from "./AttendanceDetails";
import AdminPro from './AdminPro';
import QrGenerator from "../QR/QrGenerator";
import EntriesLog from "./AllEntryExits";
import SetLocation from "./SetLoaction";
import { FaChalkboardTeacher, FaPlusCircle, FaClipboardList, FaMapMarkedAlt } from "react-icons/fa";

function AdminHome() {
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("buttonClickType");
    const storedData = stored ? JSON.parse(stored) : null;
    setSelectedButton(storedData?.BtnName || "");
  }, []);

  function handleButtonClick(buttonName) {
    setSelectedButton(buttonName);
    localStorage.setItem("buttonClickType", JSON.stringify({ BtnName: buttonName }));
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Welcome Section */}
      <div className="mt-24 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          <span className="text-red-500">Welcome!</span> to
          <span className="text-yellow-400"> Teacher Dashboard</span>
        </h1>
        <p className="mt-4 text-gray-400 max-w-2xl">
          Manage your classes, students, and activities seamlessly. Experience the power of
          <span className="text-yellow-400 font-semibold"> Uniator</span> — your all-in-one solution for real-time collaboration, secure QR gate passes, attendance tracking, and more.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col sm:flex-row rounded-2xl gap-6 p-6">
        {/* Sidebar */}
        <div className="sm:w-1/5 bg-white/10 backdrop-blur-lg rounded-2xl p-4 flex flex-col gap-4">
          <AdminPro />

          <SidebarButton
            icon={<FaChalkboardTeacher />}
            label="All Classes"
            onClick={() => handleButtonClick("All_Class")}
          />

          <SidebarButton
            icon={<FaPlusCircle />}
            label="Create Class"
            onClick={() => handleButtonClick("Create_Class")}
          />

          <SidebarButton
            icon={<FaClipboardList />}
            label="Attendance Details"
            onClick={() => handleButtonClick("Attendance")}
          />

          <SidebarButton
            icon={<FaMapMarkedAlt />}
            label="Set Location & Radius"
            onClick={() => handleButtonClick("setlocation")}
          />
        </div>

        {/* Main Content */}
        <div className="sm:w-4/5 w-full bg-white/10 backdrop-blur-lg rounded-2xl p-4 min-h-[500px] overflow-y-auto">
          {selectedButton === "All_Class" && <All_Class_adm />}
          {selectedButton === "Create_Class" && <Create_class />}
          {selectedButton === "Attendance" && <Attendance />}
          {selectedButton === "setlocation" && <SetLocation />}
          {!selectedButton && (
            <h1 className="text-white text-2xl font-bold flex justify-center items-center h-full">
              Please select an option from the sidebar
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable SidebarButton Component
function SidebarButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 border-2 border-cyan-500 text-white p-3 rounded-2xl hover:bg-cyan-500 hover:text-black transition-all duration-300"
    >
      {icon}
      {label}
    </button>
  );
}

export default AdminHome;
