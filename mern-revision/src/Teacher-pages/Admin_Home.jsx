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
        const storedData = localStorage.getItem("buttonClickType");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setSelectedButton(parsedData.BtnName);
        }
    }, []);
    function handleButtonClick(buttonName) {
        setSelectedButton(buttonName);
        localStorage.setItem("buttonClickType", JSON.stringify({ BtnName: buttonName }));
    }

    return (
        <div className="flex flex-col">
            <div className="flex z-10 justify-center content-center bg-black/80  w-full">
                <h1 className="z-20 text-3xl p-4 font-bold bg-gradient-to-tr from-pink-500 to-blue-500 bg-clip-text text-transparent/20">
                   Teacher Dashboard
                </h1>
            </div>

            <div className="flex flex-col sm:flex-row relative z-0 rounded-2xl gap-2 p-2 ">
                {/* Sidebar with Multiple Buttons */}
                <div className="sm:w-1/5 sm:flex-row bg-black sm:h-screen rounded-2xl h-[400px] p-2 relative">
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
                <div className="sm:w-4/5 bg-black sm:h-screen rounded-2xl h-[400px] p-4">
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
