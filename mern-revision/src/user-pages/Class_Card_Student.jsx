import { useContext, useState } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import PopComponent from "../UiComponents/PopupComponent";
import { ToastContainer, toast } from "react-toastify";

function Class_Card_Component({ course, x }) {
    const { SendDataSignLogin } = useContext(AppContext);
    const [ispopState, setPopUp] = useState(false);

    const localData = localStorage.getItem("UserData")
    const userEmail = localData ? JSON.parse(localData) : null;

    let total_class = localStorage.getItem("total_class");
    let AttendByYou = localStorage.getItem("AttendByYou");


    async function MakeAttendance() {

        const newObj = {
            email: userEmail.email,
            classId: course._id,
            status: "Present"
        };

        try {
            const response = await SendDataSignLogin("attendance-marking", newObj);
            console.log("Updated course response:", response);
            setPopUp(response.success);
            if(response.success){toast.success(response.message);}
            if(!response.success){toast.error(response.message);}
            total_class = response.totalClass;
            AttendByYou = response.attendendClass;

            localStorage.setItem("total_class",total_class)
            localStorage.setItem("AttendByYou",AttendByYou)

        } catch (error) {
            console.error("Error updating attendance:", error);
        }
    }
    console.log("out side ",total_class, AttendByYou)
    const percentage = parseInt((AttendByYou/total_class) * 100)

    return (
        <div className="flex flex-col text-white bg-white/15  sm:w-[400px] sm:h-[300px] justify-center content-center border-2 rounded-2xl m-2 hover:shadow-2xl shadow-blue-500 relative transition-transform duration-300 hover:scale-105">
            <div className="flex sm:flex-row justify-evenly">
                <p className="flex overflow-hidden left-0 top-0   p-2">{course.createdAt.slice(0, 10)}</p>
                <p style={{ backgroundColor: course.isActive ? "green" : "red" }}
                    className="flex rounded-2xl p-2"
                > {course.isActive ? "Attendance Live" : "Attendance Off"} </p>

            </div>
            <h1 className="flex content-center justify-center text-2xl border-2  h-10 m-2 w-3/4 rounded-2xl">{course.courseName.toUpperCase()}</h1>

            <h1 className="flex content-center justify-center text-2xl w-3/4 border-2 h-10 m-2 rounded-2xl ">Teacher: {course.Teacher}</h1>

            <h1 className="flex content-center justify-center text-2xl border-2 w-3/4  h-10 m-2 rounded-2xl ">Course Code: {course.courseCode}</h1>

            {!x ? (<button className="bg-blue-800 font-bold w-1/2 p-1 ml-20 rounded-2xl hover:bg-green-600 "
                onClick={MakeAttendance}
            >Mark Attendance</button>) : ("")}
            <div className="flex overflow-hidden p-1 gap-2">
                <a href="#" className="bg-green-700 w-2/5 ml-1 text-center rounded-xl font-bold"> more Info</a>
                <h1
                className="text-white font-bold border-2 p-1 rounded-2xl w-7/12"
                > Your Atd:- {AttendByYou}/{total_class} = {percentage}%</h1>
            </div>

            {ispopState ? (<PopComponent ispopState = {ispopState}/>) : ("")}

            <ToastContainer />

        </div>
    )
};

export default Class_Card_Component;