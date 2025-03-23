import { useEffect, useState } from "react";
import Create_class from '../Teacher-pages/Create_Class'
import All_Class_adm from "./All_Class_Ad";
import DeleteUser from "./Delete_Class";
import Attendance from "./AttendanceDetails";

import AdminPro from './AdminPro'
import QrGenerator from "../QR/QrGenerator";
import EntriesLog from "./AllEntryExits";

function AdminHome() {
    const [selectedButton, setSelectedButton] = useState(null);

    // Load last clicked button from localStorage on page reload
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
        <div className="flex flex-col bg-black">
            <div className="mt-20 flex flex-col relative bg-black items-center justify-center md:p-5 p-10 text-white">
                <h1 className=" text-3xl text-white font-bold"> <span className="text-3xl text-red-500 font-bold">Welcome !</span> to
                    <span className="text-3xl text-yellow-300 font-bold"> Teacher Dashbord </span>
                   Ultimate Class Managing Web-App</h1>
                <br></br>
                <h1 className="text-2xl text-white font-bold">
                    Your <span className="text-2xl text-red-500 font-bold">Ultimate</span> Classess Manage Hub!
                </h1>
                <div className="flex items-center md:ml-50 md:mr-50">
                    <p className="text-gray-400 p-10 items-center">Welcome to <span className="text-2xl text-yellow-300">Uniator</span>, A versatile web platform integrating real-time code collaboration, a secure gate pass system with QR scanning, an attendance tracker, an advanced to-do list with backend support, and a community discussion forum. making it an all-in-one students, and organizations.</p>
                </div>
            </div>


            <div className="flex flex-col sm:flex-row relative z-0 rounded-2xl gap-2 px-20 py-10 bg-black ">
                {/* Sidebar with Multiple Buttons */}
                <div className="sm:w-1/5 sm:flex-row bg-white/10 sm:h-screen rounded-2xl h-[400px] p-2 relative">
                    <AdminPro />
                    <button onClick={() => handleButtonClick("All_Class")} className="border-2 border-cyan-500 rounded-2xl text-white p-2  m-2 w-9/10">
                        All Classes
                    </button>
                    <button onClick={() => handleButtonClick("Create_Class")} className="border-2 border-cyan-500 rounded-2xl text-white p-2  m-2 w-9/10">
                        Create class
                    </button>


                    <button onClick={() => handleButtonClick("Attendance")} className="border-2 border-cyan-500 rounded-2xl text-white p-2  m-2 w-9/10">
                        Attendance Details
                    </button>


                </div>

                {/* Main Content */}
                <div className="sm:w-4/5 w-1/1 bg-white/10 sm:h-screen rounded-2xl p-2">
                    {selectedButton === "All_Class" && <All_Class_adm />}

                    {selectedButton === "Create_Class" && <Create_class />}

                    {selectedButton === "Attendance" && <Attendance />}



                    {/* Default Content when no button is clicked */}
                    {!selectedButton && <h1 className="text-white text-2xl">Select an option from the sidebar</h1>}
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
