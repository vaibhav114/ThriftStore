const {googleAuth,handleGoogle}=  require('../controllers/googleAuth')
const express = require('express')
const router = express.Router()

router.route('/googleAuth').post(googleAuth)
router.route('/oauth').get(handleGoogle)

module.exports = router