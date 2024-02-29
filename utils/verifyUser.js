import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.GamingAuthToken;
    console.log(token)
    if(!token){console.log('not valid',token); }
    // res.status(401).json({success:false,message:'not a valid user'})

    jwt.verify(token,'asdnjuermweas@+_nK_NKNKN++mnxeiru@@#@@#@8763giru23zxasasd',(err,user)=>{
        if(err) {res.status(401).json({success:false,message:'not a valid user'});}

        req.user = user
        next()
    })
}