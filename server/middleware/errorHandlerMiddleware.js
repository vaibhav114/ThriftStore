const errorHandlerMiddleware =(err,req,res,next)=>{
    let customError ={
        status:err.sttausCode || 500,
        msg:err.message || "SOMETHIN WENT WRONG 500 DEFAULT MSG THROWN"
    }
    
    // if(err.code && err.code ===11000 )
    // {
    //     customError.msg=`DUPLIACTED VALUE ${Object.keys(err.keyValue)} use different email`
    //     customError.status=400
    // }
    
    return res.status(customError.status).json({msg:customError.msg})
}

module.exports = errorHandlerMiddleware