const mongoose = require('mongoose');
const { Schema } = mongoose;


const pyqSchema = new Schema({
    contributer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    courseCode: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    driveLink: {
        type: String,
        required: true,
    },
    cloudinary_link: {
        type: String,
    },
});


const Pyq = mongoose.model("Pyq", pyqSchema);
module.exports = Pyq;