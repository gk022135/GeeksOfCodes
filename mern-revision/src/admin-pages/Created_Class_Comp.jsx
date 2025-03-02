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
        <div className="flex flex-col bg-gradient-to-tl from-black to-blue-900  sm:w-[400px] sm:h-[300px] justify-center content-center border-2 rounded-2xl mb-2 relative">
            <div className="flex sm:flex-row justify-evenly">
                <p className="flex overflow-hidden left-0 top-0 text-amber-50  p-2">{course.createdAt.slice(0, 10)}</p>
                <p style={{ backgroundColor: course.isActive ? "green" : "red" }}
                className="flex rounded-2xl p-2"
                > {course.isActive ? "Attendance Live" : "Attendance Off"} </p>
                <DeleteCourse props = {course.courseCode}/>

            </div>
            <h1 className="flex content-center justify-center text-2xl font-bold p-2 border-2  h-12 m-2 rounded-2xl bg-gradient-to-tl from-red-500 to-yellow-300 bg-clip-text text-transparent/90">{course.courseName}</h1>

            <h1 className="flex content-center justify-center text-2xl font-bold p-2 border-2 border-green-300 h-12 m-2 rounded-2xl bg-gradient-to-tl from-red-500 to-yellow-300 bg-clip-text text-transparent/90">Teacher: {course.Teacher}</h1>

            <h1 className="flex content-center justify-center text-2xl font-bold p-2 border-2 border-green-300 h-12 m-2 rounded-2xl bg-gradient-to-tl from-red-500 to-yellow-300 bg-clip-text text-transparent/90">Course Code: {course.courseCode}</h1>

            <button className="bg-gradient-to-br from-green-500 to-red-500 w-1/2 p-1 ml-20 rounded-2xl hover:bg-emerald-300 "
            onClick={AttendanceHandler}
            >Start Attendance</button>

        </div>
    )
}
export default ClassComponent;