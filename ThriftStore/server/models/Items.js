const mongoose =require('mongoose')

require('dotenv').config()

const ItemsSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User Id Required"]
    },
    icategory:{
        type:String,
        required:[true,"Item Category Cannot Be Empty "]
    },
    iname:{
        type:String,
        required:[true,"Item Name Cannot Be Empty "]
    },
    imrp:{
        type:String,
        required:[true,"Item Mrp Cannot Be Empty "]
    },
    isize:{
        type:String,
        required:[true,"Item Size Cannot Be Empty "]
    },
    imaterial:{
        type:String,
        required:[true,"Item Material Cannot Be Empty "]
    },
    icondition:{
        type:String,
        required:[true,"Item Condition Cannot Be Empty "]
    },
    prop1:{
        type:String,
        required:[true,"Property 1 Cannot Be Empty "]
    },
    prop2:{
        type:String,
        required:[true,"Property 2 Cannot Be Empty "]
    },
    prop3:{
        type:String,
        required:[true,"Property 3 Cannot Be Empty "]
    },
    prop4:{
        type:String,
        required:[true,"Property 4 Cannot Be Empty "]
    },
    prop5:{
        type:String,
        required:[true,"Property 5 Cannot Be Empty "]
    },
    photos:{
        type:[String],
        required:[true,"Photos cannot be Empty"]
    },
    sold:{
        type:Boolean,
        default:false
    },
    gender:{
        type:String,
        required:[true,"Gender Cannot be Empty"]
    },
    itype:{
        type:String,
        required:[true,"Item Type Cannot Be Empty"]
    }
},
{timestamps:true})

module.exports = mongoose.model("Items" ,ItemsSchema)