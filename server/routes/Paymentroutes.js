const express = require('express');
const {createOrder, verifyPayment} = require('../controllers/PaymentController');
const router = express.Router();





router.post('/createorder',createOrder);
router.post('/verifypayment',verifyPayment);
module.exports = router;