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
app.post('/uploads',photosMiddleware.array('photos',100) ,(req,res)=>{
    const uploadedFiles =[]
    for(let i=0;i<req.files.length;i++){
        const {path ,originalname}= req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length-1]
        const newPath = path + '.' +  ext
        fs.renameSync(path,newPath)
        uploadedFiles.push(newPath.replace('uploads/',''))
    }
    res.json(uploadedFiles)
})


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