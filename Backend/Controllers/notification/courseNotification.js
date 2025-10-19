//get all notification by course code with can be use by teacher and student both
const classModel = require('../../Models/ClassModel');


async function CourseNotification(req, res) {
  try {
    const { courseCode } = req.params;

    console.log("Fetching notifications for teacher:", courseCode);

    // Find classes taught by the teacher
    const classes = await classModel.find({ courseCode });

    if (!classes || classes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No classes found for the given teacher.",
      });
    }

    // Aggregate notifications from all classes
    let allNotifications = [];
    classes.forEach((classDoc) => {
      if (classDoc.Notification && classDoc.Notification.length > 0) {
        allNotifications = allNotifications.concat(classDoc.Notification);
      }
    });

    return res.status(200).json({
      success: true,
      notifications: allNotifications,
    });
  } catch (error) {
    console.error("Error in GetTeacherNotification:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching notifications.",
    });
  }
}

module.exports = CourseNotification;