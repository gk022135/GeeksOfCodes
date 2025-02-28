import { useContext, useEffect, useState } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import Class_Card_Component from "./Class_Card_Student";

function All_Class_Std({x}) {
    const { AllGetReq } = useContext(AppContext);
    const [classData, setClassData] = useState(null);


    useEffect(() => {
        async function fetchClasses() {
            const dataFromLocalStorage = localStorage.getItem("UserData");
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
        <div>
            {classData ? (

                <div className="grid grid-cols-3 gap-2">
                    {(!x ? classData.filter(course => course.isActive) : classData)
                        .map((course, index) => (
                            <div key={index} className="shadow-md p-2 rounded-lg">
                                <Class_Card_Component course={course} x = {x} />
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
