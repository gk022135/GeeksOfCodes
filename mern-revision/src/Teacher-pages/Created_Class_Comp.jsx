import { useContext } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import DeleteCourse from "./Delete_Class";
import { Bell } from 'lucide-react';

function ClassComponent({ course }) {
    const { PutRequets } = useContext(AppContext);
    console.log("porops aya kya ", course._id)

    if (!course.isActive) {
        console.log("hello ji")
    }

    async function AttendanceHandler() {
        console.log("Teacher for this course:", course);

        const newObj = {
            isActive: !course.isActive
        };

        try {
            const response = await PutRequets(course._id, newObj, "toggleattendance");
            console.log("Updated course response:", response);
        } catch (error) {
            console.error("Error updating attendance:", error);
        }
    }


    return (
        <div className="flex flex-col text-white bg-base-100 w-full h-auto sm:max-w-[400px] sm:min-h-[320px] justify-between border border-blue-600 rounded-2xl m-2 p-4 shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-in-out">

            {/* Top Row */}
            <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-base-content/60">{course.createdAt.slice(0, 10)}</span>

                <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide 
      ${course.isActive ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                    {course.isActive ? "Live" : "Closed"}
                </span>
            </div>

            {/* Course Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-3 space-y-1">
                <h2 className="text-lg font-semibold text-primary">{course.courseName}</h2>
                <p className="text-sm text-base-content/80">Instructor: <span className="font-medium">{course.Teacher}</span></p>
                <p className="text-sm font-mono text-base-content/70">Code: {course.courseCode}</p>
            </div>

            {/* Entry Timings */}
            <div className="bg-white/5 p-2 rounded-lg text-center text-sm mb-2 space-y-1 text-base-content/70">
                <p>Start Entry: <span className="font-medium">{course.startEntry}</span></p>
                <p>Last Entry: <span className="font-medium">{course.endEntry}</span></p>
                <p className="text-xs italic mt-1">Allowed Entry: {course.startEntry} - {course.endEntry}</p>
            </div>

            {/* Footer Row */}
            <div className="flex items-center justify-between mt-2 text-xs text-base-content/60">
                <p className="px-2 py-1 border border-base-300 rounded-md">
                    Expired: {course.enddate}
                </p>
                <a href="/admin-noti"><Bell size={35} color="yellow"/></a>
                
                <DeleteCourse props={course.courseCode} />
            </div>

            {/* Attendance Button */}
            <button
                className="bg-blue-600 hover:bg-green-600 transition-colors duration-200 text-white font-semibold py-2 px-4 rounded-xl mt-4 self-center w-full sm:w-2/3"
                onClick={AttendanceHandler}
            >
                Start Attendance
            </button>
        </div>



    )
}
export default ClassComponent;