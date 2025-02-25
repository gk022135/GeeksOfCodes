const express = require('express');
const router = express.Router();

const signupctrl  = require('../Controllers/SignCtrl');
const signUpValidation = require('../Middlewares/SignMidware');
const LoginValid = require('../Middlewares/LoginMidware')
const LoginCtrl = require('../Controllers/LoginCtr')
const OtpVarification = require('../Controllers/OtpVarification');
const GoogleLogin = require('../Controllers/GoogleSignup')
const QrVarifi = require('../Controllers/Qr_varifi')


// router.post('/signup',signUpValidation, signupctrl);
router.post('/login', LoginCtrl);
// router.post('/optvarification', OtpVarification);
router.post('/google-login-data', GoogleLogin);
router.post('/qr-scan-varification',QrVarifi);

module.exports = router;