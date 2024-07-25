const Booking = require('../models/Booking')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const { notFoundError } = require('../errors/index')
const {transporter,mailOptions} = require('../middleware/nodemailer')


const getMail = async(req,res)=>{
    const {ownerId} = req.params
    const user = await User.find({_id:ownerId})
    if(!user)
    {
     throw new notFoundError("Mail cannot be found as that user with that owner id not availabel")    
    }
    res.status(StatusCodes.OK).json(user)
}

const buyerMail = async(req,res)=>{
    const {buyerId} = req.params
    const user = await User.find({_id:buyerId})
    if(!user)
    {
     throw new notFoundError("Mail cannot be found as that user with that seller id not availabel")    
    }
    res.status(StatusCodes.OK).json(user)
}


const bookItem = async(req,res)=>{
    const {data}  = req.body
    console.log("BOOK ITM ",data)
    const booking = await Booking.create({...data})
    try {
        await transporter.sendMail({
            ...mailOptions,
            to:req.body.data.mail,
            subject:"Product Sold",
            text:"Log Into Your Account",
            html:`<h1>The Buyer Email is ${req.body.data.bmail} ,Get In Contact to proceed with selling</h1>`
        })
    } catch (error) {
        console.log(error)   
    }
    res.status(StatusCodes.OK).json(booking)
}

const getBookItem  = async(req,res)=>{
    const { userId } = req.user
    const booking = await Booking.find({ buyer: userId })
        .populate({
            path: 'products.itemid',
            model: 'Items'
        });
    res.status(StatusCodes.OK).json(booking)
}
module.exports= {bookItem,getBookItem,getMail,buyerMail}  