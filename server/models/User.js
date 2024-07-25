const mongoose =require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "NAME CANNOT BE EMPTY "],
      minlength: 3,
      maxlength: 12,
    },
    lname: {
      type: String,
      required: [true, "Last NAME CANNOT BE EMPTY "],
      minlength: 3,
      maxlength: 12,
    },
    email: {
      type: String,
      required: [true, "Email Cannot Be Empty"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password Cannot Be Empty"],
      minlength: 6,
    },
  });

UserSchema.pre("save",async function(next){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
  next()
})
UserSchema.methods.createJWT=function()
{
  return jwt.sign({userId:this._id , name:this.name} , process.env.JWT_SECRET ,{
    expiresIn:'30d'
  })
}

UserSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword,this.password)
  return isMatch
}
module.exports = mongoose.model("User",UserSchema);