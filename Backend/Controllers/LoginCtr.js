const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken')
const dotenv = require('dotenv')

const userModel = require('../Models/UserSchema');

const LoginCtrl = async (req, res) =>{
    try {
        dotenv.config();
        const {username, email, password} = req.body;
        console.log("login info",username,email,password);

        if(!username || !email || !password){
            return res.status(400).json({
                message : "bro conf inputs",
                success : false
            })
        }

        const isUserExists = await userModel.findOne({email : email})
        console.log(isUserExists);

        if(!isUserExists){
            return res.status(400).json({
                message : "please make sign up",
                success : false
            })
        }

        const passwordVerify = await bcrypt.compare(password, isUserExists.password)
        if(!passwordVerify){
            return res.status(400).json({
                message : "Bro Wrong password",
                success : false,
            })
        }

        //if password is correct then create jwt token
        const Myjwt = jwt.sign({email:isUserExists.email, _id:isUserExists},
            process.env.JWT_SECRETE,
            {expiresIn:'24h'}
        )

        return res.status(200).json({
            message : "login successfully",
            success : true,
            Myjwt,
            role : isUserExists.role,
            name : isUserExists.username,
            email : isUserExists.email,
        })
        
    } catch (error) {
        res.status(500).json({
            message : "Server side error For login",
            success : false
        })
        
    }
}

module.exports = LoginCtrl;