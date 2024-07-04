const notFoundMiddleware =(req,res,next)=>{
    res.status(404).json({msg:"ROUTE NOT FOUND ERROR"})
}

module.exports = notFoundMiddleware