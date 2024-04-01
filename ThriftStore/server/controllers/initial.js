const Items = require('../models/Items')
const {StatusCodes} = require('http-status-codes')

const getAllItems =async(req,res)=>{
    const item  = await Items.find({})
    const itemData  = item.map(({_id,owner,iname ,imrp ,isize ,photos})=> ({_id,owner,iname ,imrp ,isize ,photos}))
    res.status(StatusCodes.OK).json(itemData)
}
module.exports = { getAllItems}