const express = require('express');
const getrouter = express.Router();

const AllClassData = require('../Controllers/Send_All_class');

//all get routes are here

getrouter.get('/get-all-class-adm', AllClassData)

module.exports = getrouter;