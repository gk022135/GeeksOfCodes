const express = require('express');
const getrouter = express.Router();

const AllClassData = require('../Controllers/Send_All_class');
const AllClasstudent = require('../Controllers/AllClassStudent')
const All_Class_Std = require('../Controllers/Student_Subjectwise')
const QrvarificationG1G2 = require('../Controllers/QrvarificationG1G2')

//all get routes are here

getrouter.get('/get-all-class-adm', AllClassData)
getrouter.get('/get-all-class-students', AllClasstudent)
getrouter.get('/student-sub-detail-attendance', All_Class_Std);

getrouter.get('/qrvarification-of-user',QrvarificationG1G2)


module.exports = getrouter;