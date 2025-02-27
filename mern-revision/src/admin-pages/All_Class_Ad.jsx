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
               {classData.map((course, index) => (
                 <div key={index} className="shadow-md p-2 rounded-lg ">
                   <ClassComponent course={course} />
                 </div>
               ))}
             </div>
            ) : (
                <p>Loading...</p>
            )}
            
        </div>
    );
}

export default All_Class_adm;
