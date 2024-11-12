const { createRazorpayInstance } = require("../Config/config");
const razorpayInstance = createRazorpayInstance();
const Donation = require('../models/Donation');
const crypto = require('crypto');
const {sendemail} = require('../middleware/nodemailerdonation');
require("dotenv").config();



exports.createOrder = async (req,res) =>{
   const {name, amount}= req.body;





    const options = {
        amount: amount*100,
        currency: "INR",
        receipt: `receipt_order_1`,
    };


    try{
        razorpayInstance.orders.create(options,(err,order)=>{
            if(err){
                return res.status(500).json({
                    success: false,
                    message: "something went wrong",
                });
            }
            return res.status(200).json(order);

        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "something went wrong",


        });
    }
};






exports.verifyPayment = async (req,res) => {
    
    console.log(req.body);
    const {order_id, payment_id, signature} = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const hmac = crypto.createHmac("sha256",secret);

    hmac.update(order_id+"|"+payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature){
        try{
            const donation = new Donation({
                name : req.body.name,
                email : req.body.email,
                phone : req.body.phone,
                location : req.body.location,
                amount : req.body.amount,
                order_id : order_id,
                payment_id : payment_id,
                
            });
            await donation.save();
            await sendemail(req.body.email,req.body.name);
            return res.status(200).json({
                success: true,
                message: "Payment verified and data saved",
              });

        }
        catch (error) {
            console.error("Error saving donation:", error);
            return res.status(500).json({
              success: false,
              message: "Payment verified but failed to save data",
            });
          }
        } else {
          return res.status(400).json({
            success: false,
            message: "Payment not verified",
          });
    }
};