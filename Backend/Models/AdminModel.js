const { required } = require('joi')
const mongoose = require('mongoose')

const AdminModel = new mongoose.Schema({
    AdminName: {type: string, required:true},
    AdminEmail : {type: string, required: true},
    role : "Admin",
    Entry_Qr : [],
    Exit_Qr : [],
})