import { User } from "../models/user.models.js"

import jwt from 'jsonwebtoken'
import ErrorHandler from "./error.middleware.js"


export const isAuthenticated = async(req, res, next)=>{

    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler("Log In First", 404))
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = await User.findById(decoded._id)
    next()

}