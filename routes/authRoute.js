import {logout, signup,signin, updateSpinResult} from '../controllers/authControllers.js'
import express from "express"
import { verifyToken } from '../utils/verifyUser.js'

const router = express()

router.get('/signup',(req,res)=>{
    res.status(201).json({success:true,message:"have done"})
})
router.get('/demofile',(req,res)=>{
    res.status(200).json({success:true,message:"ok done"})
})
router.post('/signup',signup)
router.post('/signin',signin)
router.post('/newwinning/:id',verifyToken,updateSpinResult)
router.post('/logout',logout)

export default router