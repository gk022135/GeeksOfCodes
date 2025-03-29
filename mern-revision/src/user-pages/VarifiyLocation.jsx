import { useContext, useState } from 'react';
import getCurrentLocation from '../components/GetCurrLocation';
import { AppContext } from '../ContextApi/FisrtContext';
import { ToastContainer, toast } from "react-toastify";
import { useParams } from 'react-router-dom';

function VarifyLocation() {
    const { _id } = useParams();

    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);

    const { AllGetReq, SendDataSignLogin } = useContext(AppContext);

    async function CallGeoLocation() {
        setLoading(true);
        try {
            const { longitude, latitude } = await getCurrentLocation();
            console.log("Current Location:", longitude, latitude);
            setLatitude(latitude);
            setLongitude(longitude);

            // Sending data to backend for verification
            const queryParams = {
                longitude: longitude,
                latitude: latitude,
                classId: _id
            }
            const response = await AllGetReq("get-varify-location", queryParams) // Replace API_URL with actual URL
            setResponseData(response);



        } catch (error) {
            console.error("Error fetching location:", error);
            toast.error("Failed to get location. Please try again.");
        }
        setLoading(false);
    }

    const localData = localStorage.getItem("UserData");
    const userEmail = localData ? JSON.parse(localData) : null;

    let total_class = localStorage.getItem("total_class");
    let AttendByYou = localStorage.getItem("AttendByYou");



    async function MakeAttendance() {
        const newObj = {
            email: userEmail?.email,
            classId: _id,
            status: "Present",
        };
        console.log("User data for marking attendance:", newObj);

        try {
            const response = await SendDataSignLogin("attendance-marking", newObj);
            console.log("Updated course response:", response);

            if (response.success) toast.success(response.message);
            else toast.error(response.message);

            total_class = response.totalClass;
            AttendByYou = response.attendendClass;

            localStorage.setItem("total_class", total_class);
            localStorage.setItem("AttendByYou", AttendByYou);
        } catch (error) {
            console.error("Error updating attendance:", error);
            toast.error("Attendance marking failed. Try again.");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 text-white">
            <button
                onClick={CallGeoLocation}
                className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-md mb-4"
            >
                {loading ? "Verifying..." : "Verify Location"}
            </button>

            {!loading && longitude && latitude && (
                <div className="bg-gray-800 p-5 rounded-lg shadow-md w-full sm:w-96 text-center">
                    <h1 className="text-lg font-bold mb-2">Your Current Location:</h1>
                    <p>Longitude: {longitude}</p>
                    <p>Latitude: {latitude}</p>

                    {responseData && (
                        <>
                            <h1 className="text-lg font-bold mt-4 text-green-500">Allowed Range:{responseData.range}</h1>
                            <h1 className="text-lg font-bold mt-4">Current range: {responseData.currentDistance}</h1>

                            <h1 className="text-lg font-bold mt-4">Status:</h1>
                            <p className='text-green-600'>{responseData.message}</p>
                        </>
                    )}
                </div>
            )}

            <button
                disabled={!responseData?.success}  // ✅ Safe check using optional chaining (?.)
                onClick={MakeAttendance}
                className={`mt-4 px-4 py-2 font-semibold rounded-md 
        ${!responseData?.success ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-black hover:cursor-pointer"}`}
            >
                Mark Attendance
            </button>

            <ToastContainer />
        </div>
    );
}

export default VarifyLocation;
