//---------------------------------------------
// Daily Activity Calendar Heatmap Controller
//---------------------------------------------
const DailyActivity = require('../../Models/DailyTrack');
const UserModel = require('../../Models/UserSchema');

exports.getDailyActivityHeatmap = async (req, res) => {
    try {
        const { email } = req.query;
        const selectedYear = Number(req.query.selectedYear);

        if (!email || !selectedYear) {
            return res.status(400).json({
                success: false,
                message: "email and selectedYear are required"
            });
        }

        // Find student
        const student = await UserModel.findOne({ email: email }).lean();
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const studentId = student._id;

        // Define year range
        const startDate = new Date(selectedYear, 0, 1);
        const endDate = new Date(selectedYear, 11, 31, 23, 59, 59);

        // Fetch DailyActivity records for this year
        const activities = await DailyActivity.find({
            student: studentId,
            date: { $gte: startDate, $lte: endDate }
        })
            .select("date stats active -_id")
            .lean();

        // Map to heatmap format
        const heatmapData = activities.map((activity) => {
            const dateStr = activity.date.toISOString().split("T")[0];

            const { classesAttended = 0, problemsSolved = 0, custom = {} } =
                activity.stats || {};

            // Total count for heatmap
            const customCount = Object.values(custom).reduce(
                (acc, val) => acc + val,
                0
            );

            const totalCount =
                classesAttended + problemsSolved + customCount;

            return {
                date: dateStr,
                count: totalCount
            };
        });
        console.log("Heatmap Data:", heatmapData);

        return res.status(200).json({
            success: true,
            totalRecords: heatmapData.length,
            data: heatmapData
        });

    } catch (error) {
        console.error("Error fetching daily activity heatmap:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
