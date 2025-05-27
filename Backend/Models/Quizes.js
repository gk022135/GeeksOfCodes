const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    text: {
        type: String,
        required: true
    },
    options: [
        {
            type: String,
            required: true
        }
    ],
    answers: [
        {
            type: String,
            required: true
        }
    ]
});

const quizSchema = new Schema({
    courseCode: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    questions: [questionSchema]
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
