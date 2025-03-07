import { useState, useContext } from "react";
import { AppContext } from "../ContextApi/FisrtContext";

function EntriesLog() {
    const { AllGetReq } = useContext(AppContext);

    const [email, setEmail] = useState({ email: "" });
    const [queryData, setQueryData] = useState(null);
    console.log("user enail 1 ", email)

    function changeHandler(event) {
        const { name, value } = event.target;
        setEmail((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const clickHandler = async (params) => {
        try {
            console.log("user enail ", params)
            const response = await AllGetReq(`all-entries-of-user?${params}`, {});

            if (response) {
                setQueryData(response);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-4">
                <div>
                    <button
                        onClick={clickHandler}
                        className="bg-yellow-400 rounded p-2"
                    >
                        All Log Entries
                    </button>
                </div>
                <div className="flex gap-2">
                    <label className="text-xl font-bold">
                        Email Id
                        <input
                            placeholder="22bcs037@smvdu.ac.in"
                            type="text"
                            name="email"
                            value={email.email}
                            onChange={changeHandler}
                            className="bg-amber-50 p-2 rounded text-sm"
                        />
                    </label>
                    <button
                        onClick={() => {
                            clickHandler(`email=${email.email}`)
                        }}
                        className="bg-yellow-400 rounded p-2"
                    >
                        Search By Email
                    </button>
                </div>
            </div>

            {/* Display fetched data */}
            {/* <div>
                <h1>All Entries will Display Here</h1>
                {queryData && (
                    <pre className="bg-gray-200 p-2 rounded">{JSON.stringify(queryData, null, 2)}</pre>
                )}
            </div> */}
            <div className="relative overflow-x-auto border-2 rounded-2xl flex justify-center content-center w-[400px] sm:w-auto sm:m-6 text-white">
                <table className="sm:min-w-full border border-gray-300 shadow-lg">
                    <thead>
                        <tr className="bg-gradient-to-bl from-blue-800 to-red-800">
                            <th className="border sm:px-4 sm:py-2">S.No</th>
                            <th className="border sm:px-4 sm:py-2">Email</th>
                            <th className="border sm:px-4 sm:py-2">Entry Time</th>
                            <th className="border sm:px-4 sm:py-2">Exit Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queryData ? (queryData.data.map((entry, index) => (
                            <tr key={index} className="text-center">
                                <td className="border sm:px-4 sm:py-2">{index+1}</td>
                                <td className="border sm:px-4 sm:py-2">{entry.email}</td>
                                <td className="border sm:px-4 sm:py-2">{entry.entryTime ? new Date(entry.entryTime).toLocaleString() : "N/A"}</td>
                                <td className="border sm:px-4 sm:py-2">{entry.exitTime ? new Date(entry.exitTime).toLocaleString() : "N/A"}</td>
                            </tr>
                        ))) : ("null")}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default EntriesLog;
