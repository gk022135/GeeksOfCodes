import { useContext, useEffect, useState } from "react";
import { AppContext } from "../ContextApi/FisrtContext";

export default function FetchUserNameEmail() {
    const { AllGetReq } = useContext(AppContext);
    const [userNames, setUserNames] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await AllGetReq("all-users", {email:"22bcs037@smvdu.ac.in"});
                if (!response || !response.data) {
                    throw new Error("Failed to fetch users.");
                }
                setUserNames(response.data);
            } catch (err) {
                setError("⚠️ Error fetching users.");
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen flex">
            {/* Sidebar User List */}
            <div className="w-72 bg-gray-800 text-white p-4 space-y-4 overflow-y-auto">
                <h2 className="text-xl font-semibold border-b pb-2 border-gray-600 mb-4">All Users</h2>
                
                {error && (
                    <div className="text-red-400 text-sm bg-red-900/40 p-2 rounded">
                        {error}
                    </div>
                )}

                {userNames && userNames.length > 0 ? (
                    userNames.map((user, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-gray-700/50 p-2 rounded-lg hover:bg-gray-600 transition">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-yellow-400 flex-shrink-0">
                                <img
                                    src={user.image || "https://via.placeholder.com/150"}
                                    alt={user.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium">{user.name}</h3>
                                <p className="text-xs text-gray-300">{user.email}</p>
                            </div>
                        </div>
                    ))
                ) : !error ? (
                    <p className="text-gray-400 text-sm">No users found.</p>
                ) : null}
            </div>

            {/* Optional: Add content area on the right */}
            <div className="flex-1 p-6">
                <h1 className="text-white text-2xl">Select a user to view details</h1>
            </div>
        </div>
    );
}
