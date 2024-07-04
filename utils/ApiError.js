
export const ApiError = (res, message, statusCode=400)=>{
    res.status(statusCode).json({
        success: false,
        message
    })
}