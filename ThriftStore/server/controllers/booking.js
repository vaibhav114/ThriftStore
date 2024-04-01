const Booking = require('../models/Booking')
const {StatusCodes} = require('http-status-codes')


const bookItem = async(req,res)=>{
    const data  = req.body
    const booking = await Booking.create({...data})
    res.status(StatusCodes.OK).json(booking)
}

const getBookItem  = async(req,res)=>{
    const { userId } = req.user
    const booking = await Booking.find({buyer:userId}).populate('itemid')
    res.status(StatusCodes.OK).json(booking)

}
module.exports= {bookItem,getBookItem}  