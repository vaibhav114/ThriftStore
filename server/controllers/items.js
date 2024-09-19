
const Items = require('../models/Items')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')
const cloudinary = require('../utils/cloudinary')


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

const cleanPublicId = (path) => {
    // Replace backslashes with forward slashes and remove the file extension
    return path.replace(/\\/g, '/').replace(/\.\w+$/, '');
};

const addItems =async (req,res)=>{  
    req.body.owner=req.user.userId

    console.log(req.body)
    try {
        const uploadPromises = req.body.photos.map((imagePath) => {
            const publicId =cleanPublicId(imagePath)  // Converts to 'uploads/8ce5d846ae8c6aa4dd17436dae23b8f5.jpeg'
          return cloudinary.uploader.upload(imagePath,{
            public_id:publicId 
          });
        });
            const uploadResults = await Promise.all(uploadPromises);
        req.body.photos = uploadResults.map(result => result.secure_url);;
      } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
      }

    const Item = await Items.create(req.body)
    res.status(StatusCodes.CREATED).json({"qbv":"dd"})
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

const normalizeAndRemoveExtension = (filePath) => {
    let normalizedPath = filePath.replace(/\\/g, '/');    
    // Extract filename with extension
    const filenameWithExt = normalizedPath.split('/').pop();
    // Remove file extension
    const filenameWithoutExt = filenameWithExt.split('.').slice(0, -1).join('.');
    // Get folder path
    const folderPath = normalizedPath.replace(/[^/]*$/, '');
    // Construct the new public ID without the extension
    const publicId = folderPath + filenameWithoutExt;
    return publicId;
};


const updateItem = async (req, res) => {
    const {
        user: { userId },
        params: { id: itemId }
    } = req;

    try {
        // Create upload promises for only local images, skip cloudinary ones
        const uploadPromises = req.body.photos.map((imagePath) => {
            if (imagePath.includes('cloudinary')) {
                // Already on cloudinary, just return null to filter out later
                return null;
            } else {
                const publicId = normalizeAndRemoveExtension(imagePath); // Format the path
                return cloudinary.uploader.upload(imagePath, {
                    public_id: publicId 
                });
            }
        });

        // Resolve upload promises
        const uploadResults = await Promise.all(uploadPromises);

        // Filter out null results (already uploaded Cloudinary URLs)
        const cloudinaryImages = req.body.photos.filter(imagePath => imagePath.includes('cloudinary'));
        const newlyUploadedImages = uploadResults.filter(result => result !== null).map(result => result.secure_url);

        // Combine cloudinary images and newly uploaded ones
        req.body.photos = [...cloudinaryImages, ...newlyUploadedImages];
    } catch (error) {
        console.error('Error uploading images:', error);
        return res.status(500).json({ message: "Image upload failed" });
    }

    try {
        // Update the item
        const item = await Items.findByIdAndUpdate(
            { _id: itemId, owner: userId },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!item) {
            return res.status(404).json({ message: "No Such Item To Update" });
        }

        res.status(StatusCodes.OK).json(item);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: "Item update failed" });
    }
};

function extractPublicId(cloudinaryUrl) {
    // Split the URL by '/' and extract the part starting from 'uploads'
    const urlParts = cloudinaryUrl.split('/');

    // Find the index of 'uploads'
    const indexOfUploads = urlParts.findIndex(part => part === 'uploads');

    // Join the path starting from 'uploads'
    let publicId = urlParts.slice(indexOfUploads).join('/');

    // Remove any extension (e.g., .jpeg, .jpg) from the publicId
    publicId = publicId.replace(/\.\w+$/, '');

    return publicId;  // This will return the publicId without any extensions
}


const deleteImage = async(req,res)=>{

    const itemId = req.params.id ;
    const filename  = req.body.filename
    try {
        const item =  await Items.findById(
            {_id:itemId}
        )
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        // console.log(filename)
        // console.log(item)
        const imageIndex = item.photos.findIndex(photo => photo.includes(filename));
        if (imageIndex === -1) {
            return res.status(404).json({ message: "Image not found in item's photos" });
        }

        console.log(filename)
        console.log(imageIndex)
        // Delete the image from Cloudinary
        const publicId = extractPublicId(filename) // Remove file extension for Cloudinary public ID
        console.log(publicId)
        const deleteResult = await cloudinary.uploader.destroy(publicId);
        if (deleteResult.result !== 'ok') {
            return res.status(500).json({ message: "Failed to delete image from Cloudinary" });
        }

        // Remove the image from the item's photos array
        item.photos.splice(imageIndex, 1);
        await item.save();
    } catch (error) {
        console.log(error)
    }
    
    res.status(200).json({ message: "Image deleted successfully" });


}

const deleteItem = async (req,res)=>{
    const {
        user :{userId},  
        params:{ id:itemId}
    } = req

    try {
        const item =  await Items.findById(
            {_id:itemId}
        )
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        item.photos.map( async (itm)=>{
            const publicId = extractPublicId(itm) // Remove file extension for Cloudinary public ID
            console.log(publicId)
            const deleteResult = await cloudinary.uploader.destroy(publicId);
            // if (deleteResult.result !== 'ok') {
            //     return res.status(500).json({ message: "Failed to delete image from Cloudinary" });
            // }
        })

    } catch (error) {
        console.log(error)
    }

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
    updatePassword,
    deleteImage
}