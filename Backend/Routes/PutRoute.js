const express = require('express');
const putrouter = express.Router();


const ToggleAttendance = require('../Controllers/ToggleAttendance')
const AddQrData = require('../Controllers/AddQrByAdmin')

putrouter.put('/toggleattendance/:id', ToggleAttendance);
putrouter.put('/addordetails', AddQrData);

module.exports = putrouter