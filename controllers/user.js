import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};








// import {User }from '../models/user.models.js'
// import bcrypt from 'bcrypt'
// import { userCookie } from '../utils/userCookie.js'
// import cookieParser from 'cookie-parser'
// import jwt from 'jsonwebtoken'
// import ErrorHandler from '../middlewares/error.middleware.js'


// export const userRegister = async(req,res)=>{
//     const { name, email, password} = req.body

//     let user  = await User.findOne({email})
//     if(user) return res.status(404).json({
//         success: false,
//         message: "User Already Exists"
//     })  

//     const hashedPassword = await bcrypt.hash(password, 10)
//     user = await User.create({
//         name,
//         email, 
//         password: hashedPassword
//     })


//     userCookie(res, user, "User Created Successfully", 201);

// }

// export const userLogin = async(req, res,next)=>{
//     const {email, password} = req.body
//     if(!email || !password){
//         return next(new ErrorHandler("invalid Email or Password!", 404))
//     }
//     const user = await User.findOne({ email }).select("+passowrd")
//     if(!user){
//         return  next(new ErrorHandler("User Not Found", 404))    
//     }

//     const isMatch = await bcrypt.compare(password, user.password)
//     if(!isMatch){
//         return next(new ErrorHandler("Incorrect Password", 404))
//     }


//     userCookie(res, user, "Logged In", 201)

//     next()
    
// }

// export const getMyProfile = async(req, res)=>{ 
//     res.status(200).json({
//         success: true,
//         user: req.user
//     })
// }

// export const logoutUser = async(req, res)=>{
//     res.status(200).cookie("token","",
//         {
//             expires: new Date(Date.now()),
//             sameSite: process.env.NODE_ENV === "Development"? "lax":"none",
//             secure: process.env.NODE_ENV==="Development"?false:true

//     }).json({
//         success: false,
//         message: "user logged out successfully"
//     })
// }