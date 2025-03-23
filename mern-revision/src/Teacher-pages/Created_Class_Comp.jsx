import { useContext } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import DeleteCourse from "./Delete_Class";


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
        <div className="flex flex-col text-white bg-white/10 w-full h-auto sm:max-w-[400px] sm:min-h-[300px] justify-center border-2 rounded-2xl m-2 hover:shadow-2xl shadow-blue-500 transition-transform duration-300 hover:scale-105">
            {/* Top Row */}
            <div className="flex justify-between items-center px-3 py-2">
                <p className="text-sm truncate">{course.createdAt.slice(0, 10)}</p>

                <p
                    className={`rounded px-2 py-1 text-xs font-semibold ${course.isActive ? "bg-green-600" : "bg-red-600"
                        }`}
                >
                    {course.isActive ? "Live" : "Closed"}
                </p>

                <DeleteCourse props={course.courseCode} />

                <p className="border rounded px-2 py-1 text-xs">Expired at: {course.enddate}</p>
            </div>

            {/* Course Info */}
            <div className="flex flex-col border rounded m-2 p-2">
                <h1 className="text-md font-semibold">{course.courseName}</h1>
                <h1 className="text-md">{course.Teacher}</h1>
                <h1 className="text-md font-mono">{course.courseCode}</h1>
            </div>

            {/* Entry Timings */}
            <div className="flex flex-col items-center">
                <p className="text-sm">Start Entry: {course.startEntry}</p>
                <p className="text-sm">Last Entry: {course.endEntry}</p>
            </div>

            {/* Attendance Button */}
            <button
                className="bg-blue-900 w-1/2 p-2 mx-auto rounded-2xl hover:bg-green-700 font-bold mt-3"
                onClick={AttendanceHandler}
            >
                Start Attendance
            </button>

            {/* Entry Time Info */}
            <p className="text-sm text-center mt-2">
                Allowed Entry ({course.startEntry} - {course.endEntry})
            </p>
        </div>


    )
}
export default ClassComponent;