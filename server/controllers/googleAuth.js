const {OAuth2Client} = require('google-auth-library')
const {StatusCodes} = require('http-status-codes')

const User = require('../models/User')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




const googleAuth =async(req,res)=>{
    const redirectUrl ='http://localhost:5000/oauth'
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    )
    const authorizeUrl = oAuth2Client.generateAuthUrl(
      {
        access_type:'offline',
        scope:'https://www.googleapis.com/auth/userinfo.profile openid email',
        prompt:'consent'
      }
    )
    res.json({url:authorizeUrl})
  }
  
  async function getUserData(access_token)
  {
    try {
      const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
   
  }
  
  const handleGoogle =async(req,res)=>{
    const code = req.query.code

    try {
      const redirectUrl ='http://localhost:5000/oauth'
      const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
      )
      const result = await oAuth2Client.getToken(code)
      await oAuth2Client.setCredentials(result.tokens)
      const user = oAuth2Client.credentials

      const data = await getUserData(oAuth2Client.credentials.access_token)
      const userExists = await User.findOne({email:data.email})
      let hashPass;
      if(!userExists)
      {
        hashPass= await  generateDefaultPassword()
      }
      else{
        hashPass = userExists.password
      }
      const  newData ={
        email:data.email,
        name:data.given_name,
        lname:data.family_name,
        password:hashPass
      }
     const updateUser = await  User.findOneAndUpdate(
      {email:data.email},
      {$set:newData},
      { new: true, upsert: true, useFindAndModify: false }
     )

     const token = jwt.sign({userId:updateUser._id , name:updateUser.name} , process.env.JWT_SECRET ,{
      expiresIn:'30d'
    })
     res.cookie('token',token)
    res.redirect('http://localhost:5173')
    } catch (error) {
      console.log(error)
      res.json({msg:"Google AUth Failed"})
    }
}

const generateDefaultPassword = async () => {
  const defaultPassword = "defaultPassword"; 
  try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);
      return hashedPassword
  } catch (error) {
      console.error('Error generating hashed password:', error);
  }
};



module.exports={handleGoogle ,googleAuth}