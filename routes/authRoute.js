import {logout, signup,signin, updateSpinResult} from '../controllers/authControllers.js'
import express from "express"
import { verifyToken } from '../utils/verifyUser.js'

const router = express()

router.get('/signup',(req,res)=>{
    res.send("worked aksjdksad jkas dj")
})
router.post('/signup',signup)
router.post('/signin',signin)
router.post('/newwinning/:id',verifyToken,updateSpinResult)
router.post('/logout',logout)

export default router