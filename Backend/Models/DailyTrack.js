const mongoose = require('mongoose');
const { Schema } = mongoose;

const DailyActivitySchema = new Schema({
    student: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },

    date: {
        type: Date,
        required: true,
        index: true,
    },

    // Overall activity indicator (useful for heatmap)
    active: { 
        type: Boolean, 
        default: true 
    },

    // Track specific activity counters for the day
    stats: {
        classesAttended: { type: Number, default: 0 },
        problemsSolved: { type: Number, default: 0 },

        // Future-friendly field for new activities
        custom: {
            type: Map,
            of: Number,  // For dynamic activity types like "videosWatched", "quizzesTaken", etc.
            default: {},
        }
    }

}, { timestamps: true });

// One record per user per date
DailyActivitySchema.index({ student: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailyActivity", DailyActivitySchema);
