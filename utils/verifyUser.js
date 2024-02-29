import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.GamingAuthToken;
    console.log(token)
    if(!token){console.log('not valid',token); return; }
    // res.status(401).json({success:false,message:'not a valid user'})

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) {res.status(401).json({success:false,message:'not a valid user'}); return;}

        req.user = user
        next()
    })
}