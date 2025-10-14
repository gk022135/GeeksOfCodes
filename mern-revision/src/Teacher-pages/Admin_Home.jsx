import { useEffect, useState } from "react";
import Create_class from '../Teacher-pages/Create_Class';
import All_Class_adm from "./All_Class_Ad";
import DeleteUser from "./Delete_Class";
import Attendance from "./AttendanceDetails";
import AdminPro from './AdminPro';
import QrGenerator from "../QR/QrGenerator";
import EntriesLog from "./AllEntryExits";
import SetLocation from "./SetLoaction";
import AddResources from "./ResourcesAdd";

import { FaChalkboardTeacher, FaPlusCircle, FaClipboardList, FaMapMarkedAlt, FaArchive } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";

import NotificationManager from "../components/notificationTeacher";

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
      <div className="mt-20 flex flex-col relative items-center justify-center p-5 text-white md:px-10 sm:px-5">
        <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
          <h1 className="text-3xl text-white font-bold text-center mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            <span className="text-3xl bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent font-bold animate-pulse">Welcome !</span> to
            <span className="text-3xl bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent font-bold"> Teacher Dashboard </span>
            Ultimate Class Managing Web-App
          </h1>
          <h1 className="text-2xl text-white font-bold text-center mb-6">
            Your <span className="text-2xl bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent font-bold">Ultimate</span> Classes Manage Hub!
          </h1>
          <div className="flex items-center justify-center">
            <p className="text-gray-300 text-center sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl">
              Welcome to <span className="text-2xl bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent font-semibold">smvDeX</span>, A versatile web platform integrating real-time code collaboration, a secure gate pass system with QR scanning, an attendance tracker, an advanced to-do list with backend support, and a community discussion forum. Making it an all-in-one solution for students and organizations.
            </p>
          </div>
        </div>
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
          <SidebarButton
            icon={<FaArchive />}
            label="Add Resources"
            onClick={() => handleButtonClick("addresource")}
          />
          <SidebarButton
            icon={<MdNotificationsActive />}
            label="Add Resources"
            onClick={() => handleButtonClick("Notification")}
          />
        </div>

        {/* Main Content */}
        <div className="sm:w-4/5 w-full bg-white/10 backdrop-blur-lg rounded-2xl p-4 min-h-[500px] overflow-y-auto">
          {selectedButton === "All_Class" && <All_Class_adm />}
          {selectedButton === "Create_Class" && <Create_class />}
          {selectedButton === "Attendance" && <Attendance />}
          {selectedButton === "setlocation" && <SetLocation />}
          {selectedButton === "addresource" && <AddResources />}
          {selectedButton === "Notification" && <NotificationManager />}
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
