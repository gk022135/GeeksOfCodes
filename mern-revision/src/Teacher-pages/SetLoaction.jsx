import { useContext, useState } from "react";
import geolocation from "../components/GetCurrLocation";
import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from "react-toastify";

function SetLocation() {
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [data, setData] = useState({
        coursecode: "",
        radius: "",
    });

    const { PutRequets } = useContext(AppContext);

    // Function to fetch geolocation
    async function CallGeoLocation() {
        setFetching(true);
        try {
            const { longitude, latitude } = await geolocation();
            console.log("Current Location:", longitude, latitude);
            setLatitude(latitude);
            setLongitude(longitude);
        } catch (error) {
            console.error("Error fetching location:", error);
            toast.error("Failed to get location. Please try again.");
        }
        setFetching(false);
    }

    // Function to send data
    async function SetLocation() {
        if (!longitude || !latitude || !data.coursecode || !data.radius) {
            toast.error("Please fill all fields and fetch location before submitting.");
            return;
        }

        const objectForSendingData = {
            longitude,
            latitude,
            courseCode: data.coursecode,
            radius: data.radius,
        };

        try {
            const response = await PutRequets("", objectForSendingData, "set-location-radius");

            if (!response.success) {
                console.log("Try again");
                toast.error("Failed to update location");
            } else {
                toast.success("Your course location is updated");
            }
        } catch (error) {
            console.error("Error updating location:", error);
            toast.error("Something went wrong, please try again.");
        }
    }

    return (
        <div className="p-6 max-w-lg mx-auto text-white">
            {/* Location Section */}
            <div className="mb-6">
                <h1 className="text-xl font-bold mb-2">Your Current Location</h1>
                <button
                    onClick={CallGeoLocation}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                >
                    {fetching ? "Fetching..." : "Get Current Location"}
                </button>

                {!fetching && longitude && latitude && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-md shadow text-black">
                        <h2 className="text-md font-semibold">Longitude: {longitude}</h2>
                        <h2 className="text-md font-semibold">Latitude: {latitude}</h2>
                    </div>
                )}
            </div>

            {/* Form Section */}
            <div className="mb-6 text-white">
                <label className="block font-medium mb-1">Course Code</label>
                <input
                    type="text"
                    name="coursecode"
                    value={data.coursecode}
                    onChange={(e) => setData({ ...data, coursecode: e.target.value })}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <label className="block mt-4 font-medium mb-1">Allowed Radius (meters)</label>
                <input
                    type="number"
                    name="radius"
                    value={data.radius}
                    onChange={(e) => setData({ ...data, radius: e.target.value })}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={SetLocation}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all w-full"
                >
                    Set Location
                </button>
            </div>

            <ToastContainer />
        </div>
    );
}

export default SetLocation;
