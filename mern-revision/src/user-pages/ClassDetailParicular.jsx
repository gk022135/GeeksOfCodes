import { useParams } from "react-router-dom";
import GridCards from "../Landingpage/GridLayout";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from "react-toastify";
import TestModel from "./Test";
import NotificationStd from "./std-cls-noti";

const ClassDetailParticular = () => {
    const { courseCode, courseName, Teacher } = useParams();
    const { AllGetReq, loading, setLoading } = useContext(AppContext);
    const [isDetailopen, SetIsDetailOpen] = useState(false);

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
            console.log("hello ji res", response)

        } catch (error) {
            console.error("Error fetching attendance details:", error);
        }
    }

    // Call function on mount
    useEffect(() => {
        ShowAttendanceDetail();
    }, [courseCode]); // Re-fetch if courseCode changes
    console.log("hello ji", attendance)

    let { total_class, AttendByYou } = attendance;
    const percentage = total_class ? ((AttendByYou / total_class) * 100).toFixed(2) : 0;

    return (
        <div className="relative w-full min-h-screen bg-base-100 text-white overflow-hidden">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-30 animate-bounce"></div>
                <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full opacity-25 animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-20 animate-bounce delay-500"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-gradient-to-r from-red-500 to-pink-500 rounded-full opacity-15 animate-pulse delay-2000"></div>
            </div>

            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-pulse"></div>

            {/* Header Section */}
            <div className="relative z-10 flex flex-col items-center text-center p-6">
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                    <span className="text-red-400 drop-shadow-lg">Welcome! </span> Student{" "}
                    <span className="text-yellow-300 drop-shadow-lg">Course Details</span>
                </h1>

                {/* Course Info Section */}
                <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-4xl mt-6 gap-6 border border-gray-600/50 rounded-xl p-6 bg-white/5 backdrop-blur-sm shadow-2xl">
                    <p className="text-lg sm:text-2xl">
                        <strong className="text-gray-300">Course Code:</strong>{" "}
                        <span className="text-red-400 font-bold">{courseCode}</span>
                    </p>
                    <p className="text-lg sm:text-2xl">
                        <strong className="text-gray-300">Course Name:</strong>{" "}
                        <span className="text-red-400 font-bold">{courseName}</span>
                    </p>
                    <p className="text-lg sm:text-2xl">
                        <strong className="text-gray-300">Course Teacher:</strong>{" "}
                        <span className="text-red-400 font-bold">{Teacher}</span>
                    </p>
                </div>
            </div>

            {/* Grid Section */}
            <div className="relative z-10 px-6 py-10 flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
                    {/* Attendance Info */}
                    <div className="flex flex-col items-center justify-center p-6 border border-gray-600/50 rounded-2xl bg-gradient-to-br from-white/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105">
                        <h1 className="text-xl font-bold mb-2 text-purple-300">📅 Attendance Info</h1>
                        <p className="text-lg mb-2">
                            Total Classes: <span className="font-semibold text-green-400">{total_class}</span>
                        </p>
                        <p className="text-lg mb-2">
                            Attended Classes: <span className="font-semibold text-red-400">{AttendByYou}</span>
                        </p>
                        <p className="text-lg mb-4">
                            Percentage: <span className="font-semibold text-yellow-400">{percentage}%</span>
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-black p-2 font-bold bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl w-2/5 hover:cursor-pointer hover:from-green-600 hover:to-emerald-600 transform hover:scale-110 transition-all duration-200 shadow-lg"
                        >
                            Refresh
                        </button>
                    </div>

                    <div className="p-6 border border-gray-600/50 rounded-2xl bg-gradient-to-br from-white/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-sm shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center">
                        <h1 className="text-xl font-bold text-blue-300">📜 Details View</h1>
                        <p className="text-sm text-gray-300 mb-4">Click to expand course details</p>
                        <button
                            className="text-black p-2 font-bold bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl w-2/5 hover:cursor-pointer hover:from-green-600 hover:to-emerald-600 transform hover:scale-110 transition-all duration-200 shadow-lg"
                            onClick={() => SetIsDetailOpen(true)}
                        >
                            Show More
                        </button>
                    </div>

                    {/* Notices & Class Info */}
                    <div className="p-6 border border-gray-600/50 rounded-2xl bg-gradient-to-br from-white/10 via-orange-500/10 to-red-500/10 backdrop-blur-sm shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center">
                        <h1 className="text-xl font-bold text-orange-300">📢 Notices & Class Info</h1>
                        <p className="text-sm text-gray-300">Stay updated with announcements</p>
                    </div>
                </div>
            </div>

            {
                isDetailopen && (<TestModel onClose={() => SetIsDetailOpen(false)} />)
            }

            {/* Additional Content */}
            <div className="relative z-10">
                <NotificationStd courseCode={courseCode} />
            </div>
            <ToastContainer />

            {/* Additional Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-60 left-5 w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 animate-ping"></div>
                <div className="absolute bottom-60 right-10 w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full opacity-25 animate-ping delay-700"></div>
                <div className="absolute top-80 right-40 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-30 animate-ping delay-1500"></div>
            </div>
        </div>
    );
};

export default ClassDetailParticular;