import imag1 from '../assets/DocsImages/attendance1.jpg'
import imag2 from '../assets/DocsImages/attendance2.jpg'
function AttendanceMarking() {
    return (
        <div className="text-white antialiased bg-black min-h-screen flex flex-col items-center justify-center px-6">
            {/* Title */}
            <h1 className="text-center antialiased mt-5 text-3xl font-bold mb-5">
                Understanding How <span className="text-5xl text-red-500 font-bold">Attendance System Works</span>
            </h1>

            {/* Documentation Section */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-3xl text-left">
                <h2 className="text-2xl font-bold mb-4">Understanding How the Attendance System Works</h2>

                <h3 className="text-xl font-semibold mt-4">1. Introduction</h3>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    The attendance system is designed to help teachers efficiently mark student presence in class. 
                    It is linked to a course, activated by the teacher, and attendance records are stored in a database 
                    (MongoDB) for tracking purposes.
                </p>

                <img src={imag1} alt="Wrong QR Code Scan" className=" w-full h-auto mt-4 rounded-lg" />

                {/* Attendance Workflow */}
                <h3 className="text-xl font-semibold mt-4">2. How the Attendance System Works</h3>
                <img src={imag2} alt="Wrong QR Code Scan" className="w-full h-auto mt-4 rounded-lg" />

                <h4 className="text-lg font-semibold mt-2">📌 Attendance Activation by Teacher</h4>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    The teacher starts an attendance session, enabling students to mark their presence.
                </p>

                <h4 className="text-lg font-semibold mt-2">📌 Marking Present or Absent</h4>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    Students can mark themselves as **Present** or **Absent** once the attendance session is active.
                </p>

                <h4 className="text-lg font-semibold mt-2">📌 Linking to Course & Date</h4>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    Attendance records are linked to a **specific course** and **date**, ensuring accurate tracking.
                </p>

                <h4 className="text-lg font-semibold mt-2">📌 Checking if Attendance Exists</h4>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    Before marking attendance, the system checks if the student has already been recorded to prevent duplicates.
                </p>

                {/* Database Schema */}
                <h3 className="text-xl font-semibold mt-6">3. Database Structure (MongoDB)</h3>
                <p className="text-gray-300 text-sm mt-2 mb-2">The following MongoDB schema is used for attendance tracking:</p>
                
                <pre className="bg-gray-800 p-4 rounded-lg text-gray-300 text-sm overflow-x-auto">
{`{
    "_id": ObjectId("..."),
    "studentId": "123456",
    "courseId": "CSE101",
    "date": "2025-03-23",
    "status": "Present", // or "Absent"
    "markedBy": "teacherId123"
}`}
                </pre>

                {/* Benefits of the System */}
                <h3 className="text-xl font-semibold mt-6">4. Benefits of the Attendance System</h3>
                <ul className="list-disc list-inside text-gray-300">
                    <li>✅ Prevents false entries</li>
                    <li>✅ Helps track student participation</li>
                    <li>✅ Can be integrated with grading systems</li>
                    <li>✅ Saves time for teachers</li>
                </ul>

                
            </div>
        </div>
    );
}

export default AttendanceMarking;
