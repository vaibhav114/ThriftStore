const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {unauthenticatedError , badRequestError} = require('../errors/index')
const otpGenerator = require('otp-generator')
const UserVerification = require('../models/UserVerification')


const register =async (req,res)=>{
  const { email , otp } = req.body
   const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      msg: 'User already exists',
    });
  }
  // Find the most recent OTP for the email
  const response = await UserVerification.find({ email }).sort({ createdAt: -1 }).limit(1);
  console.log(response)
    if (response.length === 0 || parseInt(otp) !== response[0].otp) {
      return res.status(400).json({
        success: false,
        msg: 'The OTP is not valid',
      });
    }
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


const sendOTP = async (req, res) => {
    try {
      console.log("otp send started")
      const { email } = req.body;
      // Check if user is already present
      const checkUserPresent = await User.findOne({ email });
      // If user found with provided email
      if (checkUserPresent) {
        return res.status(401).json({
          success: false,
          message: 'User is already registered',
        });
      }

      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      let result = await UserVerification.findOne({ otp: otp });
      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        });
        result = await UserVerification.findOne({ otp: otp });
      }
      const otpPayload = { email, otp };
      const otpBody = await UserVerification.create(otpPayload);
      res.status(200).json({
        success: true,
        message: 'OTP sent successfully',
        otp,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports={
    register,
    login,
    logOut,
    sendOTP
}