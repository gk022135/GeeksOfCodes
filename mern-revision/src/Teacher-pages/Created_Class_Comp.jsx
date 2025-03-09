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
        <div className="flex flex-col text-white bg-white/10  sm:w-[400px] sm:h-[300px] justify-center content-center border-2 rounded-2xl m-2 hover:shadow-2xl shadow-blue-500 relative transition-transform duration-300 hover:scale-105">
            <div className="flex flex-row justify-evenly">
                <p className="flex overflow-hidden left-0 top-0 text-sm">{course.createdAt.slice(0, 10)}</p>

                <p style={{ backgroundColor: course.isActive ? "green" : "red" }}

                    className="flex rounded h-5 p-1 content-center justify-center items-center"
                > {course.isActive ? "Live" : "Closed"} </p>

                <DeleteCourse props={course.courseCode} />

                <p className="border rounded text-sm h-6 pl-1 pr-1">Expired at: {course.enddate
                }</p>

            </div>
            <div className="flex relative m-2 border rounded">
                <div className=" w-13/20 ">
                    <h1 className="flex  text-md w-1/2 m-1 gap-1 rounded ">{course.courseName}</h1>

                    <h1 className="flex  text-md  w-1/2 m-1 rounded ">{course.Teacher}</h1>

                    <h1 className="flex content-center justify-center text-dm w-1/2 m-1 rounded">{course.courseCode}</h1>
                </div>
                <div className="flex flex-col items-center h">
                    <p className="text-sm">Start Entry: {course.startEntry}</p>
                    <p className="text-sm">Last Entry: {course.endEntry}</p>
                </div>
            </div>

            <button className="bg-blue-900 w-1/2 p-2 ml-20 rounded-2xl hover:bg-green-700 font-bold"
                onClick={AttendanceHandler}
            >Start Attendance</button>
            <p className="text-sm m-2">Allowed Entry ({course.startEntry} - {course.endEntry})</p>

        </div>
    )
}
export default ClassComponent;