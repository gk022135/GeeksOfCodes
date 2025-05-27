const mongoose = require('mongoose');
const { Schema } = mongoose;

const quizResponseSchema = new Schema({
    response_id: {
        type: Schema.Types.ObjectId,
        ref: "User",  
        required: true
    },
    quiz_id: {
        type: Schema.Types.ObjectId,
        ref: "Quiz",   // Make sure "Quiz" matches your quiz model name
        required: true
    },
    responses: [
        {
            question_id: {
                type: Schema.Types.ObjectId,
                required: true
            },
            user_answer: [
                {
                    type: String,
                    required: true
                }
            ]
        }
    ]
});

const QuizResponse = mongoose.model("QuizResponse", quizResponseSchema);

module.exports = QuizResponse;
