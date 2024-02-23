export const errorHandler = (err,req,res,next)=>{
    const statusCode = err.statusCode || 401
    const message = err.message || 'failed'
    res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
}