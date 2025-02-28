const express = require('express');
const getrouter = express.Router();

const AllClassData = require('../Controllers/Send_All_class');
const AllClasstudent = require('../Controllers/AllClassStudent')

//all get routes are here

getrouter.get('/get-all-class-adm', AllClassData)
getrouter.get('/get-all-class-students', AllClasstudent)

module.exports = getrouter;