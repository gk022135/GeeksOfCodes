const userModel = require('../Models/UserSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function jwtVerification({token}) {
    try {
        const secret = process.env.JWT_SECRETE;
        console.log("screte", secret)

        if (!token) {
            console.log("Token not received");
            return false;
        }

        const decoded = jwt.verify(token, secret);
        const userEmail = decoded?.email;

        if (!userEmail) {
            console.log("No email found in token");
            return false;
        }

        const isUserExists = await userModel.findOne({ email: userEmail });

        if (isUserExists) return true;

        return false;

    } catch (error) {
        console.log("JWT Verification Error:", error.message);
        return false;
    }
}

module.exports = jwtVerification;
