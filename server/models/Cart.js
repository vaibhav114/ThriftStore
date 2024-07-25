const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bmail: {
        type: String
    },
    mail: {
        type: String
    } ,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        { 
            itemid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Items",
                required: true,
                unique: true,
                errorMessages: {
                    unique: 'Trying to book an Item which is already Booked '
                }
            },
            iprice:{
                type:Number
            }
        }
    ],
    total: {
        type: Number
    },
    amount: {
        type: Number
    }
});

module.exports = mongoose.model('Cart', CartSchema);
