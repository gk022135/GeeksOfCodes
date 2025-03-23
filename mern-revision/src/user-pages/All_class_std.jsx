import { useContext, useEffect, useState } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import Class_Card_Component from "./Class_Card_Student";

function All_Class_Std({ x }) {
    const { AllGetReq } = useContext(AppContext);
    const [classData, setClassData] = useState(null);
    const [UserName, setName] = useState("NA")


    useEffect(() => {
        async function fetchClasses() {
            const dataFromLocalStorage = localStorage.getItem("UserData");
            const parsedUser = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : "";
            setName(parsedUser.name);


            const AdminInfo = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : null;

            if (!AdminInfo) {
                console.error("No Admin Data Found");
                return;
            }

            const newObj = {
                email: AdminInfo.email,
                role: AdminInfo.role,
            };

            try {
                const response = await AllGetReq("get-all-class-students", { email: AdminInfo.email, role: AdminInfo.role });
                console.log(response);


                if (!response) {
                    console.log("No data received.");
                } else {
                    console.log("All courses:", response.message);
                    setClassData(response.data); // Store data in state
                }
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        }

        fetchClasses();
    }, []);
    // console.log("first course", classData[1])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 py-10">

            <div className="text-white text-4xl font-bold antialiased flex flex-col justify-center content-center items-center">
                <h1 className="text-white">Wellcome <span className="text-red-500">{UserName}</span> !, Have <span className="text-yellow-300">A Nice</span> Day For <span className="text-lime-500">You !!</span></h1>
                <p className="text-sm md:px-50 md:py50 text-gray-400 mt-5">Here You Can Only See those class in which attendance marking is allowed, it automatically filter by your email id, Select your class And Mark your Attendace at Time, Attendance Marking Window available for Particular time being, so be sincerly and mark your Attendance at time .....</p>
            </div>


            {classData ? (

                <div className="grid grid-cols-1 md:grid-cols-3 bg-black p-10">
                    {(!x ? classData.filter(course => course.isActive) : classData)
                        .map((course, index) => (
                            <div key={index} className="shadow-md p-2 rounded-lg">
                                <Class_Card_Component course={course} x={x} />
                            </div>
                        ))}

                </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    );
}

export default All_Class_Std;
