import { useContext, useState } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import { toast, ToastContainer } from "react-toastify";

function FacultyDetails({ email, userType, removeUrl, DetailsUrl, heading }) {
    const { AllGetReq } = useContext(AppContext);
    const [res, setRes] = useState("");

    const [data, setData] = useState({
        userEmail: "",
        removeEmail: "", // ✅ Added removeEmail field
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const facultyDetails = async () => {
        try {
            const response = await AllGetReq(DetailsUrl, { email: data.userEmail, AdminEmail: email });

            if (!response) {
                toast.error("Error, try again!");
                return;
            }
            if (response.success) {
                toast.success(response.message);
                setRes(response);
            }
        } catch (error) {
            console.error("Error occurred in FacultyDetails:", error);
        }
    };

    const removeUser = async () => {
        try {
            console.log("Removing user:", data.removeEmail);
            const response = await AllGetReq(removeUrl, { AdminEmail: email, userEmail: data.removeEmail.trim() });

            if (!response) {
                toast.error("Error, try again!");
                return;
            }
            if (response.success) {
                toast.success(response.message);
                setRes(response);
            }
        } catch (error) {
            console.error("Error occurred in RemoveUser:", error);
        }
    };

    return (
        <div className="text-white bg-black p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">{heading}</h1>
            </div>

            {/* Show Classes Section */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Find {userType} Classes</h2>
                <input
                    type="email"
                    name="userEmail"
                    value={data.userEmail}
                    onChange={onChangeHandler}
                    placeholder="Enter email"
                    className="w-full p-2 mt-2 border rounded-md text-white bg-gray-700"
                />
                <button
                    onClick={facultyDetails}
                    className="w-full mt-3 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md transition"
                >
                    Show Classes
                </button>
            </div>

            {/* Remove User Section */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Remove {userType}</h2>
                <input
                    type="email"
                    name="removeEmail" // ✅ Corrected name attribute
                    value={data.removeEmail} // ✅ Corrected state reference
                    onChange={onChangeHandler}
                    placeholder="Enter email"
                    className="w-full p-2 mt-2 border rounded-md text-white bg-gray-700"
                />
                <button
                    onClick={removeUser}
                    className="w-full mt-3 p-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded-md transition"
                >
                    Remove User
                </button>
            </div>

            {/* Show Data Section */}
            <div className="mt-6 p-3 bg-gray-800 rounded-lg">
                <h2 className="text-lg font-semibold">Data for {userType}</h2>
                <p className="text-gray-300 mt-2">{JSON.stringify(res, null, 2)}</p>
            </div>

            <ToastContainer />
        </div>
    );
}

export default FacultyDetails;



//43215678