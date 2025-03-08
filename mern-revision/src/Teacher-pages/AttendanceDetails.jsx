import { useContext, useState } from "react";
import { AppContext } from '../ContextApi/FisrtContext';
import { toast, ToastContainer } from 'react-toastify';

function Attendance() {
    const { AllGetReq } = useContext(AppContext);
    const [res, setRes] = useState(null); 


    const [course, setCourse] = useState({
        courseCode1: "",
        courseCode2: "",
        entryNumber: ""
    });


    function onChangeHandler(event) {
        const { name, value } = event.target;
        setCourse((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    

    async function CourseWiseAtt() {

        //get-attendace-all-course
        try {
            const CourseCode = course.courseCode1.trim();
            if (!CourseCode) {
                toast.error("Course Code is required!");
                return;
            }

            console.log("Fetching attendance for Course:", CourseCode);
            const response = await AllGetReq("get-attendace-all-course", { courseCode: CourseCode });

            if (!response || !response.success) {
                toast.error("Error fetching data");
                return;
            }

            toast.success("Data fetched successfully");
            setRes(response);
        } catch (error) {
            console.error("Error in CourseWiseAtt:", error);
        }
    }



    async function AttendanceOfA_student() {
        try {
            const CourseCode = course.courseCode2.trim();
            const studentEmail = course.entryNumber.trim();

            if (!CourseCode || !studentEmail) {
                toast.error("Both Course Code and Entry Number are required!");
                return;
            }

            console.log("Fetching student attendance for:", { CourseCode, studentEmail });
            const response = await AllGetReq("get-student-attendance-by-entry", {
                courseCode: CourseCode,
                studentEmail: studentEmail
            });

            if (!response || !response.success) {
                toast.error("Error fetching student attendance");
                return;
            }

            toast.success("Student attendance fetched successfully");
            setRes(response);
        } catch (error) {
            console.error("Error in AttendanceOfA_student:", error);
        }
    }


    
    return (
        <div className="bg-black text-white flex flex-col">
            {/* Attendance by Course */}
            <div className="flex flex-col gap-1 border p-2 rounded m-2 relative w-3/4">
                <h1>Attendance By Course Code</h1>
                <label>
                    Enter Course Code:
                    <input
                        className="border m-2 rounded"
                        type="text"
                        name="courseCode1"
                        value={course.courseCode1}
                        onChange={onChangeHandler}
                    />
                </label>
                <button onClick={CourseWiseAtt} className="bg-blue-700 p-2 rounded">
                    Show
                </button>
            </div>

            {/* Attendance by Student Entry */}
            <div className="flex flex-col gap-1 border p-2 rounded m-2 relative w-3/4">
                <h1>Attendance Entry Wise and In A Course</h1>
                <label>
                    Enter Course Code:
                    <input
                        className="border m-2 rounded"
                        type="text"
                        name="courseCode2"
                        value={course.courseCode2}
                        onChange={onChangeHandler}
                    />
                </label>
                <label>
                    Entry Number Of Student:
                    <input
                        className="border m-2 rounded"
                        type="text"
                        name="entryNumber"
                        value={course.entryNumber}
                        onChange={onChangeHandler}
                    />
                </label>
                <button onClick={AttendanceOfA_student} className="bg-blue-700 w-2/5 p-2">
                    Show Student Attendance
                </button>
            </div>

            {/* Response Section */}
            <div>
                {res ? (
                    <p>{JSON.stringify(res, null, 2)}</p>
                ) : (
                    <h1>No response</h1>
                )}
            </div>

            <ToastContainer />
        </div>
    );
}

export default Attendance;
