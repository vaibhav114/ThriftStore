const {bookItem,getBookItem} = require('../controllers/booking')
const express = require('express')
const router = express.Router()

router.route('/item').post(bookItem)
router.route('/bookeditem').get(getBookItem)
module.exports = router