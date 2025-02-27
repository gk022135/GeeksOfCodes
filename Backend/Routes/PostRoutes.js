const express = require('express');
const router = express.Router();

const signupctrl  = require('../Controllers/SignCtrl');
const signUpValidation = require('../Middlewares/SignMidware');
const LoginValid = require('../Middlewares/LoginMidware')
const LoginCtrl = require('../Controllers/LoginCtr')
const OtpVarification = require('../Controllers/OtpVarification');
const GoogleLogin = require('../Controllers/GoogleSignup')
const QrVarifi = require('../Controllers/Qr_varifi')

const AdminSignup = require('../Controllers/AdminSignup')
const AdminLogin = require('../Controllers/AdminLogin')
const ClassCreate = require('../Controllers/Class_Create')
const Attendance_marking = require('../Controllers/Attendance_Marking')


// router.post('/signup',signUpValidation, signupctrl);
router.post('/login', LoginCtrl);
// router.post('/optvarification', OtpVarification);
router.post('/google-login-data', GoogleLogin);
router.post('/qr-scan-varification',QrVarifi);
router.post('/admin-sign-up', AdminSignup);
router.post('/admin-login',AdminLogin)

router.post('/ClassCreate', ClassCreate)
router.post('/attendance-marking',Attendance_marking)

module.exports = router;