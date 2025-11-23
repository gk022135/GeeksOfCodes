//--------------------------------------
//GET STUDENT UPTO 5 RECENT ACTIVITIES
//--------------------------------------


// controllers/userController.js

const User = require("../../Models/UserSchema");

// Add a recent activity to a user
exports.addRecentActivity = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("id   ", userId)
        const { Activite, doneAt } = req.body;

        if (!Activite || !doneAt)
            return res.status(400).json({ message: "Activite and doneAt are required" });

        // Fetch user
        const user = await User.findById({_id : userId });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Prepare activity object
        const newActivity = { Activite, doneAt };

        // Push to the array
        user.recentActivities.activities.push(newActivity);

        // Optional: Force max limit (remove oldest)
        if (user.recentActivities.activities.length > 10) {
            user.recentActivities.activities.shift(); // FIFO → remove oldest
        }

        // Save user (validators will also run here)
        await user.save();

        return res.status(200).json({
            message: "Activity added successfully",
            activities: user.recentActivities.activities
        });

    } catch (error) {
        // Mongoose validation error (e.g., doneAt length != 6)
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed",
                error: error.message
            });
        }

        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};