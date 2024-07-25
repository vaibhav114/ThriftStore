const Cart = require('../models/Cart')

const addToCart = async(req,res)=>{
    const {data} = req.body
    console.log(data)
    try {
        const cart  = await Cart.findOneAndUpdate({bmail:data.bmail},
            {$set : data},
            { new: true, upsert: true, useFindAndModify: false }
        )
        console.log(cart)
        res.status(200).json({msg:"Cart Added"})
    } catch (error) {
        res.json({msg:error})
    }   
}

const getCartItems = async(req,res)=>{
    const  {buyer} = req.query
    try {
        const response = await Cart.find({buyer:buyer}).populate({
            path: 'products.itemid',
            model: 'Items'
        });
        res.status(200).json({data:response})
    } catch (error) {
        console.log(error)
        res.status(400).json({msg:"item not found"})
    }
}

const updateCartItem = async(req,res)=>{
    const {data} = req.body
    console.log(data)
    try {
        const cart  = await Cart.findOneAndUpdate({bmail:data.bmail},
            {$set : data},
            { new: true, upsert: true, useFindAndModify: false }
        )
        console.log(cart)
        res.status(200).json({msg:"Cart Updated"})
    } catch (error) {
        res.json({msg:error})
    }   
}

const deleteCart = async(req,res)=>{
    const {payload} = req.params
    console.log(payload)
    try {
        const cart  = await Cart.findOneAndDelete({buyer:payload})
        res.status(200).json({msg:"Item Deleted"})
    } catch (error) {
        console.log(error)
        res.status(200).json({msg:"item failed to delete"})
    }
}

module.exports={addToCart,getCartItems ,updateCartItem ,deleteCart}