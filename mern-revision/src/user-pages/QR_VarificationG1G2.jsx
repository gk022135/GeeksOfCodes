import { useContext, useState } from "react";
import { AppContext } from "../ContextApi/FisrtContext";

function QrvarificationG1g2({ Qrvalue }) {
    const [response, setResponse] = useState(null);
    const [scanning, setScanning] = useState(false); // Controls when to scan
    const { AllGetReq } = useContext(AppContext);

    const varifcation = async () => {
        if (!Qrvalue) return; // Prevents running if Qrvalue is empty

        const userDetails = localStorage.getItem("UserData");
        const email = userDetails ? JSON.parse(userDetails).email : "null";
        console.log("QR Value: ", Qrvalue);

        try {
            const varificationRes = await AllGetReq("qrvarification-of-user", { qrvalue: Qrvalue, email });
            setResponse(varificationRes);
            console.log("QR Verification Details: ", varificationRes);
        } catch (error) {
            console.log("Error in verifying QR: ", error);
        }
    };

    return (
        <div className="m-2 rounded-2xl bg-gradient-to-l from-blue-700 to-green-600">

            <button
                onClick={() => {     //awesom logic best use of call back
                    setScanning(true);
                    varifcation();
                }}
                className="px-4 py-2 bg-blue-800 text-white rounded"
            >
                Check Status
            </button>

            {scanning && response && (
                <div className="m-4 w-[300px]">
                    <h1 className="text-xl font-bold">Status: 

                    <span className="text-xl text-red-800 font-bold p-2 rounded-2xl">{response.message}</span> 
                    </h1>
                    {response.success ? (
                        <div className="flex flex-col w-3/4 m-2 justify-center content-center relative left-10 gap-4">
                            <h1 className="text-black font-bold text-2xl">Status Of Qr</h1>
                            <p className="text-black/70 text-sm">Allowed : <span className="bg-red-500 m-1 text-2xl p-2 rounded text-black">Yes</span></p>

                            <p className="text-black text-sm font-bold">
                                Date: {new Date().toLocaleDateString()}
                            </p>

                            <p className="text-black text-sm font-bold flex flex-col">Direction: <span className="bg-red-600 text-sm font-bold p-2 rounded">{response.direction}</span> </p>
                        </div>
                    ) : (<div className="bg-red-600 p-2 rounded-2xl m-2"> 
                        <h1 className="font-bold text-black text-2xl"> Your Can't go please Scan Again</h1>
                    </div>)}
                </div>
            )}
        </div>
    );
}

export default QrvarificationG1g2;
