const AttendanceModel = require('../Models/Attendance');

async function Attendance_marking(req, res) {
    try {
        const { classId, userId, status } = req.body;
        console.log("Attendance data ", req.body);

        if (!classId || !userId || !status) {
            return res.status(400).json({
                message: "Class ID, User ID, and status are required",
                success: false
            });
        }

        // Find attendance for the given class on today's date
        const today = new Date().setHours(0, 0, 0, 0);
        let attendance = await AttendanceModel.findOne({ course: classId, date: today });

        if (!attendance) {
            // If no attendance exists for today, create a new record
            attendance = new AttendanceModel({
                course: classId,
                date: today,
                attendanceRecords: [{ student: userId, status }]
            });
        } else {
            // Check if student already marked attendance
            const existingRecord = attendance.attendanceRecords.find(record => record.student.toString() === userId);
            if (existingRecord) {
                return res.status(400).json({
                    message: "Attendance already marked for this student",
                    success: false
                });
            }

            // Add the student's attendance
            attendance.attendanceRecords.push({ student: userId, status });
        }

        await attendance.save(); // Save to DB

        return res.status(200).json({
            message: "Your attendance has been marked successfully",
            success: true
        });

    } catch (error) {
        console.error("Error marking attendance:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

module.exports = Attendance_marking;
