import { useContext, useEffect, useState } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import ClassComponent from "./Created_Class_Comp";

function All_Class_adm() {
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
                const response = await AllGetReq("get-all-class-adm", { email: AdminInfo.email, role: AdminInfo.role });
                console.log("course ", response);


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
        <div className=" min-h-screen flex items-center justify-center px-6 py-10">
            <div className="h-[500px] w-1/1 overflow-y-scroll">
                {classData ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
                        {classData.map((course, index) => (
                            <div key={index} className="shadow-md p-2 rounded-lg">
                                <ClassComponent course={course} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>

    );
}

export default All_Class_adm;
