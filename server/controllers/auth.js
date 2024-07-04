const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {unauthenticatedError , badRequestError} = require('../errors/index')


const register =async (req,res)=>{
    const user = await User.create({...req.body})
    const token =user.createJWT()
    res.status(StatusCodes.CREATED).json({name:user.name,token})
}

const login = async (req,res)=>{
    const { email, password} = req.body
    if(!email || !password)
    {
        throw new badRequestError("Provide Email and Password")
    }
    const user = await User.findOne({email})
    if(!user)
    {
        throw new unauthenticatedError("Email Not Found")
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect)
    {
        throw new unauthenticatedError("Invalid Password")
    }
    const token = user.createJWT()
    res.cookie('token',token).status(StatusCodes.OK).json({name:user.name,token,userId:user._id})
}

const logOut = async(req,res)=>{
    res.cookie('token','').json(true)
}

module.exports={
    register,
    login,
    logOut
}