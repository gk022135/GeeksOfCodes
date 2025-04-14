import classmanage from "../assets/DocsImages/classmanage.jpg"
import attendancebycourse from "../assets//DocsImages/attendancebycourse.jpg"
function ClassCreate() {
    return (
        <div className="text-white antialiased bg-base-100 min-h-screen flex flex-col items-center justify-center px-6">
            {/* Title */}
            <h1 className="text-center text-3xl antialiased font-bold mb-5 mt-5">
                Understanding How <span className="text-4xl text-red-500 font-bold">Class Management By Teacher works</span>
            </h1>

            {/* Documentation Section */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-3xl text-left">
                <h2 className="text-2xl font-bold mb-4">Understanding the Class Management System</h2>

                <h3 className="text-xl font-semibold mt-4">1. Introduction</h3>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    The Class Management System allows teachers to efficiently organize and manage their classes.
                    Teachers can view active/inactive courses, start attendance, create new classes, and track class expiry.
                </p>

                <img src={classmanage} alt="Wrong QR Code Scan" className="w-full h-auto mt-4 rounded-lg" />

                {/* Key Features */}
                <h3 className="text-xl font-semibold mt-4">2. Key Features of the Class Management System</h3>
                <img src={attendancebycourse} alt="Wrong QR Code Scan" className="w-full h-auto mt-4 rounded-lg" />

                <h4 className="text-lg font-semibold mt-2">📌 Viewing Active & Inactive Courses</h4>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    Teachers can see a list of their courses and check whether they are currently **Active** or **Inactive**.
                </p>

                <h4 className="text-lg font-semibold mt-2">📌 Starting Attendance for a Class</h4>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    Once a class is active, the teacher can **start attendance** with a single click, allowing students to mark their presence.
                </p>

                <h4 className="text-lg font-semibold mt-2">📌 Creating a Class</h4>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    Teachers can create a new class by entering:
                </p>
                <ul className="list-disc list-inside text-gray-300">
                    <li>✅ Course Code</li>
                    <li>✅ Teacher Name</li>
                    <li>✅ Expiry Date (Optional)</li>
                </ul>

                <h4 className="text-lg font-semibold mt-2">📌 Expiry of Class (Set by Teacher)</h4>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    Teachers can define an **expiry time** for each class, ensuring students only mark attendance within the given timeframe.
                </p>

                <h4 className="text-lg font-semibold mt-2">📌 Viewing All Classes for the Day</h4>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    The system lists all scheduled classes for the **current day**, allowing teachers to manage their schedules efficiently.
                </p>

                {/* Database Schema */}
                <h3 className="text-xl font-semibold mt-6">3. Database Structure (MongoDB)</h3>
                <p className="text-gray-300 text-sm mt-2 mb-2">The following MongoDB schema is used for managing class details:</p>
                
                <pre className="bg-gray-800 p-4 rounded-lg text-gray-300 text-sm overflow-x-auto">
{`{
    "_id": ObjectId("..."),
    "courseCode": "CSE101",
    "teacherName": "John Doe",
    "status": "Active", // or "Inactive"
    "expiryDate": "2025-04-01",
    "createdAt": "2025-03-23",
    "classesForTheDay": ["CSE101", "CSE102", "MTH201"]
}`}
                </pre>

                {/* Benefits of the System */}
                <h3 className="text-xl font-semibold mt-6">4. Benefits of the Class Management System</h3>
                <ul className="list-disc list-inside text-gray-300">
                    <li>✅ Helps teachers manage multiple classes efficiently</li>
                    <li>✅ Ensures attendance tracking is seamless</li>
                    <li>✅ Prevents students from marking attendance after class expiry</li>
                    <li>✅ Provides a clear schedule for the day</li>
                </ul>

                
            </div>
        </div>
    );
}

export default ClassCreate;
