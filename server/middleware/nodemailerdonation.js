const nodemailer = require('nodemailer')

require('dotenv').config()

const email = process.env.EMAIL
const pass = process.env.EMAIL_PASS

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:email,
        pass
    }
})

const sendemail = async (recipientemail,name)=>{
const mailOptions ={
    from:email,
    to:recipientemail,
    subject: 'Thank you for your Donation',
    text: `Dear ${name}, \n Thankyou for your generous Donation! Your support helps us make a difference. \n Best Regards, \n Thrift Store`,
};
try{
    await transporter.sendMail(mailOptions);
    console.log("Email sent");

} catch (error){
    console.log("error sending email");
}

};




module.exports={
    sendemail,
}