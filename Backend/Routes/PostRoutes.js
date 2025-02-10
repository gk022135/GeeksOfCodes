const express = require('express');
const router = express.Router();

const signupctrl  = require('../Controllers/SignCtrl');
const signUpValidation = require('../Middlewares/SignAndLoginMdle');
const LoginValid = require('../Middlewares/SignAndLoginMdle');
const LoginCtrl = require('../Controllers/LoginCtr')

router.post('/signup',signUpValidation, signupctrl);
router.post('/login',LoginValid, LoginCtrl);
module.exports = router;