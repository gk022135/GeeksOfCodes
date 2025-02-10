const express = require('express');
const router = express.Router();

const signupctrl  = require('../Controllers/SignCtrl');
const signUpValidation = require('../Middlewares/SignMidware');
const LoginValid = require('../Middlewares/LoginMidware')
const LoginCtrl = require('../Controllers/LoginCtr')

router.post('/signup',signUpValidation, signupctrl);
router.post('/login',LoginValid, LoginCtrl);
module.exports = router;