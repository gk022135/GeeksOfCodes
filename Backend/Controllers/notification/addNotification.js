const classModel = require("../../Models/ClassModel");
const teacherModel = require("../../Models/AdminModel");

// Delete a specific notification by ID
async function deleteNotification(notificationId, courseCode) {
  const updated = await classModel.findOneAndUpdate(
    { courseCode },
    { $pull: { Notification: { _id: notificationId } } },
    { new: true }
  );

  if (!updated) throw new Error("Notification not found or unable to delete");
  return updated;
}

// View all notifications for a class
async function viewNotifications(Teacher) {
  const classData = await classModel.findOne({ Teacher });
  console.log(classData);

  if (!classData || !classData.Notification?.length) {
    return { notifications: [], success: true, message: "No notifications found" };
  }

  return {
    notifications: classData.Notification,
    success: true,
    message: "Notifications fetched successfully",
  };
}

// Main handler
async function AddNotification(req, res) {
  try {
    const { courseCode, courseName, heading, description, expiry, email, classId, actions, message } =
      req.body;

    console.log("Request Body:", req.body);

    // Validate teacher existence
    const teacher = await teacherModel.findOne({ email });
    if (!teacher) {
      return res.status(400).json({
        success: false,
        message: "Teacher not found. Invalid email.",
      });
    }

    // Handle delete request
    if (actions === "delete" && message && courseCode) {
      await deleteNotification(message, courseCode);
      return res.status(200).json({
        success: true,
        message: "Notification deleted successfully",
      });
    }

    // Handle view request
    if (actions === "view" && email) {
      const data = await viewNotifications(email);
      return res.status(200).json(data);
    }

    // Handle add notification
    if (!courseCode || !heading || !description || !expiry) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields for adding notification",
      });
    }

    const classDoc = await classModel.findOne({ courseCode });
    if (!classDoc) {
      return res.status(404).json({
        success: false,
        message: "Class not found. Invalid course code.",
      });
    }

    // Add new notification object
    const newNotification = {
      courseCode,
      courseName,
      heading,
      description,
      expiry,
      createdBy: email,
      createdAt: new Date(),
    };

    await classModel.findByIdAndUpdate(classDoc._id, {
      $push: { Notification: newNotification },
    });

    return res.status(200).json({
      success: true,
      message: "Notification added successfully",
      notification: newNotification,
    });
  } catch (error) {
    console.error("Error in AddNotification:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
}

module.exports = AddNotification;
