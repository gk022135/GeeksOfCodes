const CourseModel = require('../../Models/ClassModel');

const getNotificationsByTeacher = async (req, res) => {
  try {
    console.log("Fetching notifications for teacher:", req.params.teacherName);
    const { teacherName } = req.params;

    // Find all courses taught by this teacher
    const courses = await CourseModel.find({ Teacher: teacherName });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: 'No courses found for this teacher' });
    }

    // Combine notifications from all courses
    const allNotifications = courses.flatMap(course => course.Notification);

    return res.status(200).json({
      teacher: teacherName,
      totalNotifications: allNotifications.length,
      notifications: allNotifications
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = getNotificationsByTeacher ;
