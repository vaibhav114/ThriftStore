const {login ,register ,logOut} = require('../controllers/auth')
const express = require('express')
const router = express.Router()


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(logOut)

module.exports = router 