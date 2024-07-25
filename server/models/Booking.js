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
    mail:{
        type:String
    },
    bmail:{
        type:String
    },
    amount:{
        type:Number
    },
    total:{
        type:Number
    },
    products: [
        { 
            itemid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Items",
                required: true,
            },
            iprice:{
                type:String
            }
        }
    ]

},
{timestamps:true})

module.exports = mongoose.model("Booking" ,BookingSchema)