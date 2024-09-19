const express = require('express')
const app = express()
require('dotenv').config()
require('express-async-errors')
const connectDb = require('./db/connect')
const routerAuth = require('./routes/auth')
const routerAccount = require('./routes/profile')
const routerItems = require('./routes/items')
const routerInitial = require('./routes/initial')
const routerBooking = require('./routes/booking')
const routerGoogleAuth = require('./routes/googleAuth')
const routerCart = require('./routes/cart')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorHandlerMiddleware =require('./middleware/errorHandlerMiddleware')
const notFoundMiddleware = require('./middleware/notFoundMiddleware')
const authentication = require('./middleware/authentication')
const multer = require('multer')
const fs= require('fs')
const path = require('path');
const port = process.env.PORT || 5000
const upload = require('./utils/multer')
const crypto = require('crypto');

app.use(express.json());
app.use(cookieParser())
const uploadsDirectory = path.join(__dirname, '/uploads');
app.use('/uploads' ,express.static(uploadsDirectory))
app.use(cors({
     origin: 'http://localhost:5173',
    credentials:true
}));

app.use('/',routerGoogleAuth)
app.use('/auth',routerAuth)
app.use('/profile',routerAccount)
app.use('/initial',routerInitial)
app.use('/items',authentication,routerItems)
app.use('/booking',authentication,routerBooking)
app.use('/cart',authentication,routerCart)




const photosMiddleware = multer({dest:'uploads'})

app.post('/uploads', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];

        // Generate a unique hash based on the file content
        const fileBuffer = fs.readFileSync(path);  // Read the file's buffer
        const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');  // Generate MD5 hash

        // Create the new path using the hash to avoid duplicates
        const newPath = `uploads/${hash}.${ext}`;

        // Rename the file only if it doesn't already exist
        if (!fs.existsSync(newPath)) {
            fs.renameSync(path, newPath);
        } else {
            // Remove the newly uploaded file if it already exists
            fs.unlinkSync(path); 
        }

        // Push the relative path to the uploaded files list
        uploadedFiles.push(newPath);
    }

    res.json(uploadedFiles);
});

// app.post('/uploads' ,upload.array('photos',10) , async(req,res)=>{
//     if (!req.files) {
//         return res.status(400).send('No file uploaded.');
//       }
//       try {
//         console.log(req.files)
//         const fileBuffer =  req.files.buffer ; 
//         console.log(fileBuffer)
//       } catch (error) {
//         console.log(error)
//       }

//       return res.json({msg:"Success "})
// })


app.get('/test-cloudinary', (req, res) => {
    cloudinary.uploader.upload("D:\\ThriftStore\\server\\uploads\\5e82924e54404459eed9ac171f9ef1dc.jpeg", function(error, result) {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ url: result.secure_url });
    });
  });
  

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async ()=>{
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`Server Runing On Port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()