const express = require('express');
const getrouter = express.Router();

const AllClassData = require('../Controllers/Teacher/Send_All_class');
const AllClasstudent = require('../Controllers/Student/AllClassStudent')
const All_Class_Std = require('../Controllers/Student/Student_Subjectwise')
const QrvarificationG1G2 = require('../Controllers/QrvarificationG1G2')
const AllEntries = require('../Controllers/AllEntries')



//teacher Imports
const AttendByStudentEntry = require('../Controllers/Teacher/AttendanceByEntry')

//all get routes are here

getrouter.get('/get-all-class-adm', AllClassData);
getrouter.get('/get-all-class-students', AllClasstudent);
getrouter.get('/student-sub-detail-attendance', All_Class_Std);

getrouter.get('/qrvarification-of-user',QrvarificationG1G2);


//teachers routes
getrouter.get('/get-student-attendance-by-entry',AttendByStudentEntry)

getrouter.get('/all-entries-of-user',AllEntries);
module.exports = getrouter;