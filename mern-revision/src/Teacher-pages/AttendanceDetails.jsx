import { useContext, useState } from "react";
import {AppContext} from '../ContextApi/FisrtContext'
import {toast,ToastContainer} from 'react-toastify'


function Attendance() {
    const {AllGetReq}  = useContext(AppContext);
    const [res, setRes] = useState("");
    const [course, setCourse] = useState({
        courseCode1 : "",
        courseCode2 : "",
        entryNumber : ""
    });


    function onChangeHandler(event) {
        const { name, value } = event.target;

        setCourse((prev) => ({
            ...prev,
            [name]: value
        }));
    }


   async function CourseWiseAtt (){
        try {
            const CourseCode = course.courseCode1;
            const response = await AllGetReq("api ulr", {courseCode : CourseCode})

            if(!response){
               toast.error("error while fetching data");
            }
            if(response.success){
                 toast.success("Data fetch succeesfully")
                 setCourse(response);
            }

        } catch (error) {
            console.log("error occur in Teacher",error);
            return;
        }

    }


    async function AttendanceOfA_student(){
        try {
            const CourseCode = course.courseCode2;
            const studentEmail = course.entryNumber
            const response = await AllGetReq("api ulr", {courseCode : CourseCode, studentEmail : studentEmail})

            if(!response){
               toast.error("error while fetching data");
            }
            if(response.success){
                 toast.success("Data fetch succeesfully")
                 setCourse(response);
            }

        } catch (error) {
            console.log("error occur in Teacher",error);
            return;
        }

    }

    // console.log(course)


    return (
        <div className="bg-black text-white flex flex-col">
            <div className="flex flex-col gap-1 border p-2 rounded m-2 relative w-3/4">
                <h1>Attendance By Course Code</h1>
                <label>Enter Course Code
                    <input
                        className="border m-2 rounded "
                        type="text"
                        name="courseCode1"
                        value={course.courseCode1}
                        onChange={onChangeHandler}
                    />
                </label>
                <button onClick={CourseWiseAtt}
                className="bg-blue-700 p-2 rounded"
                >Show</button>
            </div>
            <div className="flex flex-col gap-1 border p-2 rounded m-2 relative w-3/4">
                <h1>Attendance Entry Wise and In A Course</h1>
                <label>Enter Course Code
                    <input
                        className="border m-2 rounded "
                        type="text"
                        name="courseCode2"
                        value={course.courseCode2}
                        onChange={onChangeHandler}
                    />
                </label>
                <label>Entry Number Of Student
                    <input
                        className="border m-2 rounded "
                        type="text"
                        name="entryNumber"
                        value={course.entryNumber}
                        onChange={onChangeHandler}
                    />
                </label>
                <button onClick={AttendanceOfA_student}
                className="bg-blue-700  w-2/5 p-2"
                >Show Student Attendance</button>
            </div>
            <div>
                <p>
                    {res ? (<p>
                        {res}
                    </p>)
                     : 
                    (<h1> no response</h1>)}
                </p>
            </div>
            <ToastContainer />
        </div>
    )
}
export default Attendance;




// show attendance in each course Teacher will enter the course code the all present student will be there

//search attendance by course code :- input admin email and course code, request type :- Get

//search attendace of particular student by particular course:- course code and student entry, request Type :- Get