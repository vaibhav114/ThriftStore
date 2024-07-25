const mongoose =    require('mongoose');
const {transporter ,mailOptions} = require('../middleware/nodemailer')
const UserVerificationSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
      type:Number,
      required:true
    }
},{timestamps:true})


async function sendVerificationEmail(email, otp) {
    try {
      await transporter.sendMail(
        {
            ...mailOptions,
            to:email,
            subject:'OTP VERIFY',
            text:"VERIFICATION",
            html:`<h1>Please confirm your OTP</h1>
             <p>Here is your OTP code: ${otp}</p>`
        }
      );
    } catch (error) {
      console.log("Error occurred while sending email: ", error);
    }
  }

UserVerificationSchema.pre("save", async function (next) {
    console.log("New document saved to the database");
    // Only send an email when a new document is created
    if (this.isNew) {
      await sendVerificationEmail(this.email, this.otp);
    }
    next();
  });

module.exports= mongoose.model("UserVerification",UserVerificationSchema);