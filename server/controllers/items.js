
const Items = require('../models/Items')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')
const uploadPhoto = async (req,res)=>{

    res.send("Upload Success")
}

const getAllItems = async(req,res)=>{
    const {
        user :{userId},
    } = req
    const item = await Items.find({ owner: { $ne: userId }, sold: { $ne: true } });
    // const itemData  = item.map(({_id,owner,iname ,imrp ,isize ,photos,gender})=> ({_id,owner,iname ,imrp ,isize ,photos}))
    res.status(StatusCodes.OK).json(item)
}
const getItemByID = async(req,res)=>{
    const { id:itemId } = req.params
    const items = await Items.find({_id:itemId})
    res.status(StatusCodes.OK).json(items)
}
const addItems =async (req,res)=>{  
    req.body.owner=req.user.userId
    const Item = await Items.create(req.body)
    res.status(StatusCodes.CREATED).json({Item})
}

const getItems =async(req,res)=>{
    const item = await Items.find({owner: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({item,count:item.length})
}

const getSingleItem = async(req,res)=>{
    const {
        user :{userId},
        params:{ id:itemId}
    } = req

    const item = await Items.findOne({
        _id:itemId,
        owner:userId
    })
    if(!item){
        throw new notFoundError("Item With That ID Not Found ")
    }

    res.status(StatusCodes.OK).json(item)
}
const updateItem = async(req,res)=>{
    const {
        user :{userId},  
        params:{ id:itemId}
    } = req

    const item = await Items.findByIdAndUpdate(
        {_id:itemId ,owner:userId},
        req.body,
    { new: true, runValidators: true }
    )
    if(!item){
        throw new notFoundError("No Such Item To Update")
    }
    res.status(StatusCodes.OK).json(item)
}

const deleteItem = async(req,res)=>{
    const {
        user :{userId},  
        params:{ id:itemId}
    } = req

    const item = await Items.findByIdAndDelete({
        _id:itemId,
        owner:userId
    })
    if(!item){
        throw new notFoundError("No item ith this ID To Delete ")
    }
    res.status(StatusCodes.OK).json(item)
}
const soldItem = async (req, res) => {
    const { products, sold } = req.body;
    console.log("Sold ITM ");
    console.log(products);

    try {
        const updatePromises = products.map(async (itm) => {
            const item = await Items.findByIdAndUpdate(
                itm.itemid,  // Use itm.itemid directly
                { sold: sold },
                { new: true, runValidators: true }
            );

            if (!item) {
                throw new NotFoundError("No item with this ID found");
            }

            return item;
        });

        const updatedItems = await Promise.all(updatePromises);
        res.status(StatusCodes.OK).json(updatedItems);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};


const latestItems = async(req,res)=>{
    const {
        user :{userId},
    } = req
    const item = await Items.find({ owner: { $ne: userId }, sold: { $ne: true } }).sort({createdAt:-1}).limit(3);
    res.status(StatusCodes.OK).json(item)
}

const updatePassword = async(req,res)=>{
    const {
        user :{userId}
    } = req
    const { password } = req.body;

    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password,salt)
    const user = await User.findByIdAndUpdate(
        userId,
        { password: hashPass },
    { new: true, runValidators: true }
    )
    if(!user){
        throw new notFoundError("No Such User To Update")
    }
    res.status(StatusCodes.OK).cookie('token','').json(user)
}
module.exports={
    uploadPhoto,
    addItems,
    getItems,
    getSingleItem,
    updateItem,
    deleteItem,
    getItemByID,
    getAllItems,
    soldItem,
    latestItems,
    updatePassword
}