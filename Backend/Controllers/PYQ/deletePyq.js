// controllers/pyq/deletePyq.js
const Pyq = require("../../Models/Pyqschema");
const User = require("../../Models/UserSchema");

// const cloudinary = require("cloudinary").v2;

exports.deletePyq = async (req, res) => {
    try {
        const pyqId = req.params.id;
        const userEmail = req.user.id;

        //test user in pyq contributer and userEmail is smae or not
        const user = await User.findById(userEmail);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const userId = user._id.toString();

        //find email in pyq contributer
        const pyqIdObj = await Pyq.findById(pyqId);
        if (!pyqIdObj) {
            return res.status(404).json({ message: "PYQ not found" });
        }
        
        // Only contributor can delete
        if (pyq.contributer.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized to delete this PYQ" });
        }

        // // Delete from Cloudinary if exists
        // if (pyq.cloudinary_link) {
        //     const publicId = pyq.cloudinary_link.split("/").pop().split(".")[0];
        //     await cloudinary.uploader.destroy(publicId);
        // }

        await pyq.deleteOne();

        res.json({ message: "PYQ deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
