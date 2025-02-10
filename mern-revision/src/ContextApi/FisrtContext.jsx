import { useContext, createContext, useState } from "react";

const BASE_URL = "http://localhost:3000/mern-revision/v1";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const [loading, setLoading] = useState(false); // Fixed typo (flase → false)

    async function SendDataSignLogin(Api_url, DataObjectToSend) {
        setLoading(true);

        const URL = `${BASE_URL}/${Api_url}`;
        console.log("requestes", URL);

        try {
            const result = await fetch(URL, {
                method: "POST",
                credentials: "include", //Ensures cookies are sent and received
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(DataObjectToSend),
            });

            const fetchResponse = await result.json(); // Await the response JSON
            console.log("Response from backend:", fetchResponse); // Log to check data
            return fetchResponse;
        } catch (error) {
            console.error("Error in fetching:", error);
            return { success: false, message: "Request failed", error }; // Return error response
        } finally {
            setLoading(false);
        }
    }

    const value = {
        loading,
        setLoading,
        SendDataSignLogin,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}
