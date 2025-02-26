const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema({
    courseCode: { type: String, required: true, unique: true },
    courseName: { type: String, required: true },
    teacher: { type: String, required: true },
});

const CourseModel = mongoose.model("Course", CourseSchema);
module.exports = CourseModel;
