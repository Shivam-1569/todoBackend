import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from 'jsonwebtoken'


export const isAuthenticated = async(req, res, next)=>{

    const {token} = req.cookies
    if(!token){
        return ApiError(res, " login first", 404)
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = await User.findById(decoded._id)
    next()

}