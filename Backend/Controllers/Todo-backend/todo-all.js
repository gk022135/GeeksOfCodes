const userModel = require('../../Models/UserSchema');


//-------------------------------------------
// Helper: Fetch User By Email
//-------------------------------------------
async function dbcall(email, res) {
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "You are not allowed",
            success: false,
        });
    }

    return user;
}



//-------------------------------------------
// GET ALL CURRENT TASKS
//-------------------------------------------
async function GetAllTask(req, res) {
    try {
        const { email } = req.query;
        const user = await dbcall(email, res);
        console.log("get all tasks")

        return res.status(200).json({
            message: "Tasks fetched successfully",
            success: true,
            data: user.currentTask
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}



//-------------------------------------------
// GET ALL COMPLETED TASKS
//-------------------------------------------
async function CompletedTask(req, res) {
    try {
        const { email } = req.query;
        const user = await dbcall(email, res);
        console.log("completed tasks")

        return res.status(200).json({
            message: "Completed tasks fetched successfully",
            success: true,
            data: user.completedTask
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}



//-------------------------------------------
// ADD NEW TASK  (POST)
//-------------------------------------------
async function AddNewTask(req, res) {
    try {
        const { email, taskBody } = req.body;

        const user = await dbcall(email, res);
        console.log("add new task")

        const updateData = await userModel.findByIdAndUpdate(
            user._id,
            { $push: { currentTask: taskBody } },
            { new: true }
        );

        return res.status(200).json({
            message: "Task added successfully",
            success: true,
            data: updateData.currentTask
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}



//-------------------------------------------
// MOVE TASK → COMPLETED (PUT)
//-------------------------------------------
async function MoveTaskToCompleted(req, res) {
    try {
        const { email, taskBody } = req.body;

        const user = await dbcall(email, res);
        console.log("move to completed", taskBody)

        // Add to completed
        const addCompleted = await userModel.findByIdAndUpdate(
            user._id,
            { $push: { completedTask: taskBody } },
            { new: true }
        );

        // Remove from current tasks
        // await userModel.findByIdAndUpdate(
        //     user._id,
        //     { $pull: { currentTask: taskBody } },
        //     { new: true }
        // );

        await userModel.findByIdAndUpdate(
            user._id,
            {
                $pull: {
                    currentTask: {
                        task: taskBody.task,                 // match by task text
                    }
                }
            },
            { new: true }
        );

        return res.status(200).json({
            message: "Task moved to completed",
            success: true,
            data: addCompleted.completedTask
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}



//-------------------------------------------
// DELETE A CURRENT TASK
//-------------------------------------------
async function DeleteNotCompletedTask(req, res) {
    try {
        const { email, taskBody } = req.body;

        console.log("DELETE hit:", taskBody);

        const user = await dbcall(email, res);

        const updateData = await userModel.findByIdAndUpdate(
            user._id,
            {
                $pull: {
                    currentTask: {
                        task: taskBody,                 // match by task text
                        createdAt: taskBody.createdAt        // and timestamp
                    }
                }
            },
            { new: true }
        );

        return res.status(200).json({
            message: "Task deleted successfully",
            success: true,
            data: updateData.currentTask
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}


// EXPORT
module.exports = {
    GetAllTask,
    CompletedTask,
    AddNewTask,
    MoveTaskToCompleted,
    DeleteNotCompletedTask
};