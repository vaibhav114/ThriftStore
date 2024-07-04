const express = require('express')

const {viewProfile,getProfile} = require('../controllers/profile')
const router = express.Router()

router.route('/view').get(viewProfile)
router.route('/getname').get(getProfile)

module.exports = router