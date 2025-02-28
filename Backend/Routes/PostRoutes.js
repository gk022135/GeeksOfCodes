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


//todos imports
// const AddUser = require('../controllers/AddUser');
// const AddTask = require('../controllers/AddTask');
// const deleteTasks = require('../controllers/DeleteTask');
// const completedTasks = require('../controllers/CompletedTask');
// const Alltasks = require('../controllers/all-gets/Alltasks');


// router.post('/signup',signUpValidation, signupctrl);
router.post('/login', LoginCtrl);
// router.post('/optvarification', OtpVarification);
router.post('/google-login-data', GoogleLogin);
router.post('/qr-scan-varification',QrVarifi);
router.post('/admin-sign-up', AdminSignup);
router.post('/admin-login',AdminLogin)

router.post('/ClassCreate', ClassCreate)
router.post('/attendance-marking',Attendance_marking)



//todos routes are here
// router.post('/adduser', AddUser);
// router.put('/addtask',AddTask)
// router.put('/deletetask',deleteTasks);
// router.put('/completed-tasks',completedTasks);

// router.get('/get-all-tasks/:email',Alltasks)

module.exports = router;