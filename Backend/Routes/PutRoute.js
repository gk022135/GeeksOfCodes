const express = require('express');
const putrouter = express.Router();


const ToggleAttendance = require('../Controllers/ToggleAttendance')

putrouter.put('/toggleattendance/:id', ToggleAttendance);

module.exports = putrouter