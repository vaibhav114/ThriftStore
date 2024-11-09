const nodemailer = require('nodemailer')
require('dotenv').config()

const email = process.env.EMAIL
const pass = process.env.EMAIL_PASS

const transporter = nodemailer.createTransport({
    service:"gmail",
    port:465,
    secure:true ,
    logger:true,
    secureConnection:false,
    auth:{
        user:email,
        pass
    },
    tls:{
        rejectUnauthorized:true
    }
})

const mailOptions ={
    from:email
}


module.exports={
    transporter,
    mailOptions
}