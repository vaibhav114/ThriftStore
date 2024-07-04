const {bookItem,getBookItem,getMail,buyerMail} = require('../controllers/booking')
const express = require('express')
const router = express.Router()

router.route('/item').post(bookItem)
router.route('/bookeditem').get(getBookItem)
router.route('/getmail/:ownerId').get(getMail)
router.route('/getbuyermail/:buyerId').get(buyerMail)
module.exports = router