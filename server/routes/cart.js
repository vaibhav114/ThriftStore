const express = require('express')
const router = express.Router()
const {addToCart,getCartItems,updateCartItem ,deleteCart}  = require('../controllers/cart')

router.route('/addtocart').post(addToCart)
router.route('/getcartitems').get(getCartItems)
router.route('/updatecartitem').post(updateCartItem)
router.route('/deletecart/:payload').delete(deleteCart)
module.exports = router