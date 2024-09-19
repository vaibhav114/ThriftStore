const {uploadPhoto ,addItems ,getItems ,getSingleItem ,updateItem ,deleteItem,getItemByID,getAllItems,soldItem,latestItems,updatePassword,deleteImage}=  require('../controllers/items')
const express = require('express')
const router = express.Router()


router.route('/photos').post(uploadPhoto)
router.route('/add').post(addItems)
router.route('/get').get(getItems)
router.route('/getsingleitem/:id').get(getSingleItem)
router.route('/update/:id').patch(updateItem)
router.route('/delete/:id').delete(deleteItem)
router.route('/getbyid/:id').get(getItemByID)
router.route('/getallitems').get(getAllItems)
router.route('/sold').patch(soldItem)
router.route('/getlatest').get(latestItems)
router.route('/updatepass').patch(updatePassword)
router.route('/deleteimage/:id').patch(deleteImage)
module.exports = router