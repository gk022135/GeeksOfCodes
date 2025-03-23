import { useParams } from "react-router-dom";
import GridCards from "../Landingpage/GridLayout";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from "react-toastify";

const ClassDetailParticular = () => {
    const { courseCode, courseName, Teacher } = useParams();
    const { AllGetReq, loading, setLoading } = useContext(AppContext);

    const [attendance, setAttendance] = useState({
        total_class: 0,
        AttendByYou: 0,
    });

    const userDetail = localStorage.getItem("UserData");
    const userEmail = userDetail ? JSON.parse(userDetail).email : "";

    const querParam = { email: userEmail, courseCode };

    async function ShowAttendanceDetail() {
        try {
            const response = await AllGetReq("get-single-class-details", querParam);
            if (!response) {
                toast.error("Try again, something went wrong!");
                return;
            }
            
            setAttendance({
                total_class: response.totalClass,
                AttendByYou: response.attendendClass
            });
            console.log("hello ji res",response)
            
        } catch (error) {
            console.error("Error fetching attendance details:", error);
        }
    }

    // Call function on mount
    useEffect(() => {
        ShowAttendanceDetail();
    }, [courseCode]); // Re-fetch if courseCode changes
    console.log("hello ji",attendance)

    let { total_class, AttendByYou } = attendance;
    const percentage = total_class ? ((AttendByYou / total_class) * 100).toFixed(2) : 0;

    return (
        <div className="relative w-full min-h-screen bg-black text-white">
            {/* Header Section */}
            <div className="flex flex-col items-center text-center p-6">
                <h1 className="text-3xl sm:text-4xl font-bold">
                    <span className="text-red-500">Welcome! </span> Student{" "}
                    <span className="text-yellow-300">Course Details</span>
                </h1>

                {/* Course Info Section */}
                <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-4xl mt-6 gap-6 border border-gray-400 rounded-xl p-6">
                    <p className="text-lg sm:text-2xl">
                        <strong>Course Code:</strong>{" "}
                        <span className="text-red-500">{courseCode}</span>
                    </p>
                    <p className="text-lg sm:text-2xl">
                        <strong>Course Name:</strong>{" "}
                        <span className="text-red-500">{courseName}</span>
                    </p>
                    <p className="text-lg sm:text-2xl">
                        <strong>Course Teacher:</strong>{" "}
                        <span className="text-red-500">{Teacher}</span>
                    </p>
                </div>
            </div>

            {/* Grid Section */}
            <div className="px-6 py-10 flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
                    {/* Attendance Info */}
                    <div className="flex flex-col items-center justify-center p-6 border rounded-2xl bg-white/10 shadow-lg">
                        <h1 className="text-xl font-bold mb-2">📅 Attendance Info</h1>
                        <p className="text-lg">
                            Total Classes: <span className="font-semibold text-green-500">{total_class}</span>
                        </p>
                        <p className="text-lg">
                            Attended Classes: <span className="font-semibold text-red-500">{AttendByYou}</span>
                        </p>
                        <p className="text-lg">
                            Percentage: <span className="font-semibold text-yellow-400">{percentage}%</span>
                        </p>
                        <button className="text-black p-2 font-bold bg-green-500 rounded-xl w-2/5">Refresh</button>
                    </div>
                    <div className="p-6 border rounded-2xl bg-white/10 shadow-lg flex flex-col items-center justify-center">
                        <h1 className="text-xl font-bold">📜 Details View</h1>
                        <p className="text-sm text-gray-300">Click to expand course details</p>
                    </div>

                    {/* Notices & Class Info */}
                    <div className="p-6 border rounded-2xl bg-white/10 shadow-lg flex flex-col items-center justify-center">
                        <h1 className="text-xl font-bold">📢 Notices & Class Info</h1>
                        <p className="text-sm text-gray-300">Stay updated with announcements</p>
                    </div>
                </div>

            </div>

            {/* Additional Content */}
            <GridCards />
            <ToastContainer />
        </div>
    );
};

export default ClassDetailParticular;
