const { required } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema({
    courseCode: { type: String, required: true, unique: true },
    courseName: { type: String, required: true },
    Teacher: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },

    enddate: { type: String, required: true },
    startEntry: { type: String, required: true },
    endEntry: { type: String, required: true },
    Department: { type: String, required: true },
    longitude: { type: Number},
    latitude: { type: Number },
    radius: { type: Number },
    Notification: [
        {
            heading: String,
            description: String,
            createdAt: { type: Date, default: Date.now, expires: '7d' }
        }
    ]

});


const CourseModel = mongoose.model("Course", CourseSchema);
module.exports = CourseModel;
