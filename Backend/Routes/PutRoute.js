const express = require('express');
const putrouter = express.Router();


const ToggleAttendance = require('../Controllers/Teacher/ToggleAttendance')
const AddQrData = require('../Controllers/AddQrByAdmin')
const SetAllowedLocation = require('../Controllers/Teacher/SetAllowedLocation')
const updateUserProfile = require('../Controllers/Student/Update-profile')



// COMMUNITY IMPORT
const Like = require('../Controllers/CommunityStuff/LikeOnPost');
const Dislike = require('../Controllers/CommunityStuff/DislikePost')
const CommnetOnPost = require('../Controllers/CommunityStuff/CommnetOnPost')


putrouter.put('/toggleattendance/:id', ToggleAttendance);
putrouter.put('/addordetails', AddQrData);
putrouter.put('/set-location-radius', SetAllowedLocation)
putrouter.put('/update-user-profile', updateUserProfile);


//COMMUNITY PUT ROUTES
putrouter.put('/make-like-on-post/',Like);
putrouter.put('/make-dislike-on-post',Dislike);
putrouter.put('/make-a-comment',CommnetOnPost);


//TODO UPDATE ROUTES
const {MoveTaskToCompleted,DeleteNotCompletedTask} = require('../Controllers/Todo-backend/todo-all')

putrouter.put('/move-task-to-completed', MoveTaskToCompleted);
putrouter.put('/delete-current-task', DeleteNotCompletedTask);


//RECENT ACTTIVITIES OF USERS
const {addRecentActivity} = require('../Controllers/Student/StudentRecentActivity')
putrouter.put('/adding-recent-activity/:id',addRecentActivity)

module.exports = putrouter