const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { unauthenticatedError } = require('../errors')


const viewProfile = async (req,res)=>{
    res.send("View Profile")
}

const getProfile = async(req,res)=>{
    try {
        const {token} = req.cookies 
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // req.user = { userId: payload.userId, name: payload.name }
        res.json({userId: payload.userId, name: payload.name ,token:token})
    } catch (error) {
       res.send(null)
    }
}



module.exports ={
    viewProfile,
    getProfile
}