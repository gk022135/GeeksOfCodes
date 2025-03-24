function GatePassWorking() {
    return (
        <div className="text-white antialiased  bg-black min-h-screen flex flex-col items-center justify-center px-6">
            {/* Title */}
            <h1 className="text-center text-4xl antialiased font-bold mb-4 mt-5">
                Understanding The <span className="text-4xl text-red-500 font-bold">Gate Pass System </span>
            </h1>

            {/* Documentation Section */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-3xl text-left mt-10">
                <h2 className="text-xl antialiased font-bold mb-4">Understanding the QR-Based Gate Pass System</h2>

                <h3 className="text-xl font-semibold mt-4">1. Introduction</h3>
                <p className="text-gray-300 text-sm mt-2">
                    This Gate Pass System ensures **secure, real-time** entry and exit tracking through QR scanning.
                    **Admins** generate unique QR codes for **entry and exit**, ensuring only **university-verified** students can pass.
                </p>

                {/* Gate Pass Workflow */}
                <h3 className="text-xl font-semibold mt-4">2. How the Gate Pass System Works</h3>

                <h4 className="text-lg font-semibold mt-2">📌 Admin-Generated QR Codes for Entry & Exit</h4>
                <p className="text-gray-300 text-sm mt-2">
                    - The **admin** generates two distinct **QR codes**: one for **entry** and one for **exit**.  
                    - These QR codes are refreshed **periodically** to prevent misuse.
                </p>

               

                <h4 className="text-lg font-semibold mt-2">📌 University Email Verification</h4>
                <p className="text-gray-300 text-sm mt-2">
                    - Only students with an **official university email** (e.g., *abc@smvdu.ac.in*) are allowed.  
                    
                </p>

                <h4 className="text-lg font-semibold mt-2">📌 Real-Time Entry & Exit Logs</h4>
                <p className="text-gray-300 text-sm mt-2">
                    - Each **scan is logged in real-time** with timestamps.  
                    - Admins can **track** student movements and **prevent misuse**.
                </p>

                {/* Database Schema */}
                <h3 className="text-xl font-semibold mt-6">3. Database Structure (MongoDB)</h3>
                <p className="text-gray-300 text-sm mt-2 mb-2">The following MongoDB schema is used for gate pass management:</p>
                
                <pre className="bg-gray-800 p-4 rounded-lg text-gray-300 text-sm overflow-x-auto">
{`{
    "_id": ObjectId("..."),
    "studentId": "S12345",
    "email": "student@university.edu",
    "scanType": "Entry", // or "Exit"
    "scanTime": "2025-03-23T10:45:00Z",
    "verified": true
}`}
                </pre>

                {/* Benefits of the System */}
                <h3 className="text-xl font-semibold mt-6">4. Benefits of the QR-Based Gate Pass System</h3>
                <ul className="list-disc list-inside text-gray-300 text-sm mt-2">
                    <li>✅ **QR-based scanning** ensures quick and **contactless** verification.</li>
                    <li>✅ **Admin-controlled QR generation** prevents unauthorized access.</li>
                    <li>✅ **University email verification** blocks non-students.</li>
                    <li>✅ **Real-time logs** enhance security and tracking.</li>
                </ul>

                
            </div>
        </div>
    );
}

export default GatePassWorking;
