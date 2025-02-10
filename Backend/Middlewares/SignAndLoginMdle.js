const joi = require('joi');
const jwt = require('jsonwebtoken');

const SignupValid = (req, res, next) => {
    try {
        const schema = joi.object({
            username: joi.string().min(3).max(20).required(),
            email: joi.string().email().messages({
                'string.email': 'Invalid email format'
            }).required(),
            password: joi.string().alphanum().min(6).required(),
            role: joi.string().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            console.log("Validation Error:", error.details[0].message);
            return res.status(400).json({
                message: "Check your input fields",
                success: false,
                error: error.details[0].message
            });
        }

        next();
    } catch (error) {
        console.log("Error in Signup Middleware:", error);
        return res.status(500).json({
            message: "Middleware failure",
            success: false,
        });
    }
};

const LoginValid = (req, res, next) => {
    const token = req.cookies.Myjwt;
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRETE);
      req.user = decoded; // Attach user data to request

      next(); // Continue to next middleware/route
    } catch (error) {
        console.log("error",error);
      return res.status(403).json({ message: "Invalid token" });
    }
  };
  


module.exports = SignupValid;
module.exports = LoginValid;

//dglkdg

//dfkgj