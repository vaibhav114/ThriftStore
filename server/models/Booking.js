const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User Id Required"]
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Buyer Id Required"]
    },
    itemid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Items",
        required:[true,"Item Id Required"],
        unique:true,
        errorMessages: {
            unique: 'Trying to book an Item which is already Booked '
        }
    },
    mail:{
        type:String
    },
    bmail:{
        type:String
    }
},
{timestamps:true})

module.exports = mongoose.model("Booking" ,BookingSchema)