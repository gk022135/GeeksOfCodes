const userSchema = require('../../Models/UserSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function ListAllUsers(req, res) {
    try {
        const { email } = req.query;              // Extract email from URL params
        const authHeader = req.cookies.Myjwt;
       

        console.log("what is in cookies", authHeader)
        console.log("what comes inside credential ", email)
        console.log(req.query)

        if (!authHeader) {
            return res.status(401).json({ message: "Missing token" });
        }
        
        

        const jwtSecret = process.env.JWT_SECRETE;

        // Check if the requesting user exists
        const isUser = await userSchema.findOne({ email });
        if (!isUser) {
            return res.status(404).json({
                message: "You are not authorized.",
                success: false
            });
        }

        // Decode and validate JWT token
        
        const decryptedData = jwt.verify(authHeader, jwtSecret);
        console.log(decryptedData)
        if (decryptedData.email !== email) {
            return res.status(403).json({
                message: "Invalid credentials.",
                success: false
            });
        }

        // Get all users (not just matching email), selecting name and email only
        const allUsers = await userSchema.find({}, "username email image");

        return res.status(200).json({
            message: "Users fetched successfully.",
            success: true,
            data: allUsers
        });

    } catch (error) {
        console.error("Error in get all users:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
}

module.exports = ListAllUsers;
