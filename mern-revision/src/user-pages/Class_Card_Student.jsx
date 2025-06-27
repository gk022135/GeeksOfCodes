import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { AppContext } from "../ContextApi/FisrtContext";
import PopComponent from "../UiComponents/PopupComponent";
import { ToastContainer, toast } from "react-toastify";

function Class_Card_Component({ course, x }) {
    const { SendDataSignLogin } = useContext(AppContext);
    const [ispopState, setPopUp] = useState(false);
    const navigate = useNavigate();

    const localData = localStorage.getItem("UserData");
    const userEmail = localData ? JSON.parse(localData) : null;

    let total_class = localStorage.getItem("total_class");
    let AttendByYou = localStorage.getItem("AttendByYou");

    async function MakeAttendance() {
        const newObj = {
            email: userEmail.email,
            classId: course._id,
            status: "Present",
        };

        try {
            const response = await SendDataSignLogin("attendance-marking", newObj);
            console.log("Updated course response:", response);
            setPopUp(response.success);

            if (response.success) toast.success(response.message);
            else toast.error(response.message);

            total_class = response.totalClass;
            AttendByYou = response.attendendClass;

            localStorage.setItem("total_class", total_class);
            localStorage.setItem("AttendByYou", AttendByYou);
        } catch (error) {
            console.error("Error updating attendance:", error);
        }
    }

    console.log("out side ", total_class, AttendByYou);
    const percentage = parseInt((AttendByYou / total_class) * 100);




    // Function to navigate to course details page
    const handleMoreInfoClick = () => {
        navigate(`/all-classes-student/${course.courseCode}/${course.courseName}/${course.Teacher}`);
    };
    const SetLoaction = () => {
        navigate(`/varifylocaation/${course._id}`);
    };


    SetLoaction


    return (
        <div className="flex flex-col bg-base-100 sm:w-[400px] sm:h-[320px] justify-between border border-blue-700 rounded-2xl m-2 p-4 hover:shadow-2xl shadow-blue-500 relative transition-transform duration-300 hover:scale-105  text-white">

            {/* Top Section */}
            <div className="flex justify-between items-center text-sm mb-2">
                <p className="text-slate-300">{course.createdAt.slice(0, 10)}</p>
                <p
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide 
        ${course.isActive ? "bg-green-600" : "bg-red-600"}`}
                >
                    {course.isActive ? "Attendance Live" : "Attendance Off"}
                </p>
            </div>

            {/* Course Details */}
            <div className="text-center space-y-1 mb-4">
                <h1 className="text-lg font-bold tracking-wide text-white">{course.courseName.toUpperCase()}</h1>
                <h2 className="text-sm text-slate-300">Teacher: <span className="font-medium">{course.Teacher}</span></h2>
                <h2 className="text-sm text-slate-400 font-mono">Code: {course.courseCode}</h2>
            </div>

            {/* Attendance Button */}
            {!x && (
                <button
                    className="bg-blue-700 hover:bg-green-600 transition-colors duration-200 font-semibold py-2 px-4 rounded-xl mx-auto w-3/4 text-sm"
                    onClick={SetLoaction}
                >
                    Verify & Mark Attendance
                </button>
            )}

            {/* More Info & Attendance Summary */}
            <div className="flex justify-between items-center mt-4 gap-2">
                <button
                    className="bg-green-700 hover:bg-green-800 transition-colors duration-200 text-sm font-semibold px-4 py-2 rounded-xl w-5/12"
                    onClick={handleMoreInfoClick}
                >
                    More Info
                </button>

                <div className="text-xs bg-white/10 text-white px-3 py-2 rounded-xl w-7/12 text-center">
                    <span className="font-semibold">Your Atd:</span> {AttendByYou}/{total_class} = <span className="text-blue-300">{percentage}%</span>
                </div>
            </div>

            {/* Pop Component and Toast */}
            {ispopState && <PopComponent ispopState={ispopState} />}
            <ToastContainer />
        </div>

    );
}

export default Class_Card_Component;
