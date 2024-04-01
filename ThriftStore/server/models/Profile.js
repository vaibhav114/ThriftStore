const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    address:{
        type:String
    },
    phone:{
        type:String
    }
})