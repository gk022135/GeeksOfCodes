const express = require('express');
const router = express.Router();

const signupctrl  = require('../Controllers/SignCtrl');
const signUpValidation = require('../Middlewares/SignMidware');
const LoginValid = require('../Middlewares/LoginMidware')
const LoginCtrl = require('../Controllers/LoginCtr')
const OtpVarification = require('../Controllers/OtpVarification');


router.post('/signup',signUpValidation, signupctrl);
router.post('/login', LoginCtrl);
router.post('/optvarification', OtpVarification);
module.exports = router;