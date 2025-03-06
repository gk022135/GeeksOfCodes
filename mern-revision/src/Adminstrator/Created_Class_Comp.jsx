import { useContext } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import DeleteCourse from "./Delete_Class";


function ClassComponent({ course }) {
    const {PutRequets} = useContext(AppContext);
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
            <div className="flex sm:flex-row justify-evenly">
                <p className="flex overflow-hidden left-0 top-0   p-2">{course.createdAt.slice(0, 10)}</p>
                <p style={{ backgroundColor: course.isActive ? "green" : "red" }}
                className="flex rounded-2xl p-2 "
                > {course.isActive ? "Attendance Live" : "Attendance Off"} </p>
                
                <DeleteCourse props = {course.courseCode}/>

            </div>
            <h1 className="flex content-center justify-center text-2xl border-2  w-3/4 h-10 m-2 rounded-2xl ">{course.courseName}</h1>

            <h1 className="flex content-center justify-center text-2xl border-2 w-3/4 h-10 m-2 rounded-2xl ">Teacher: {course.Teacher}</h1>

            <h1 className="flex content-center justify-center text-2xl w-3/4 border-2 h-10 m-2 rounded-2xl">Course Code: {course.courseCode}</h1>

            <button className="bg-blue-900 w-1/2 p-2 ml-20 rounded-2xl hover:bg-green-700 font-bold"
            onClick={AttendanceHandler}
            >Start Attendance</button>

        </div>
    )
}
export default ClassComponent;