const { getAllItems } = require('../controllers/initial')
const express=  require('express')
const router = express.Router()

router.route('/items/all').get(getAllItems)


module.exports=router