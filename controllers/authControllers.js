import userModel from '../models/authModel.js'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

export const signup = async (req,res)=>{
    const {fullname,phone,email,password} = req.body
    console.log("result---->",req.body)
    try {
        const hashedpassword = bcryptjs.hashSync(password,10)
        const data =new userModel({
            fullname,phone,email,password:hashedpassword
        })
        const resdata = await data.save()
  
        const {password:hashpass,...restdata} = resdata._doc
        console.log(resdata)

        if(resdata){
            const currentDate = new Date();
            const expirydate = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // Adding 30 days in milliseconds

            const expiresInSeconds = 5 * 24 * 60 * 60; // 5 days * 24 hours/day * 60 minutes/hour * 60 seconds/minute
            const token = jwt.sign({id:resdata._id},'asdnjuermweas@+_nK_NKNKN++mnxeiru@@#@@#@8763giru23zxasasd',{expiresIn:expiresInSeconds})
            res.cookie('GamingAuthToken',token,{
                httpOnly:true,
                sameSite:'none',
                secure:'true',
                maxAge:expirydate
            }).status(201).json({success:true,message:'user created successfully',restdata})
        }
    } catch (error) {
        console.log(error.message)
        res.status(401).json({success:false,message:'user creation failed'})
    }
}

export const signin = async(req,res)=>{
    const {phone,password} = req.body
    console.log(req.body)
    try {
        const validUser = await userModel.findOne({phone})
        if(!validUser){
            res.status(401).json({success:false,message:'user not registered'})
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){
            res.status(401).json({success:false,message:'not a valid password'})
        }
        const {password:hashedpassword,...restdata} = validUser._doc
        const currentDate = new Date();
        const expirydate = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // Adding 30 days in milliseconds
        const expiresInSeconds = 5 * 24 * 60 * 60; // 5 days * 24 hours/day * 60 minutes/hour * 60 seconds/minute
        const token = jwt.sign({id:restdata._id},'asdnjuermweas@+_nK_NKNKN++mnxeiru@@#@@#@8763giru23zxasasd',{expiresIn:'1h'})
        res.cookie('GamingAuthToken',token,{
            httpOnly:true,
            // sameSite:'none',
            // maxAge:expirydate
        }).status(201).json({success:true,message:'user login successfully',restdata})

    } catch (error) {
        res.status(401).json({success:false,message:'user not registered'})
    }
}

export const updateSpinResult = async(req,res)=>{
    console.log('clicked',req.body.winning ,req.user.id,req.params.id)
    try {
        if (req.user.id !== req.params.id) {
            res.status(401).json({success:false,message:'not a valid user'})
            return;
        }
        console.log('clicked1',req.body.winning," ",req.params.id)
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{
            $set:{
                winning:req.body.winning,
                deposite:req.body.deposite
            },
        },
        {new :true, runValidators:true}
        );

        if(!updatedUser){
            res.status(401).json({success:false,message:'invalid spin'})
        }
        const { password, ...rest } = updatedUser._doc;
        res.status(201).json({success:true,message:'updated successfully',rest})
    } catch (error) {
        res.status(401).json({success:false,message:'not a valid user'})
    }
}
export const logout = async (req, res) => {
    try {
        console.log('clickedddd...')
        // res.cookie('GamingAuthToken', '', {
        //     httpOnly: true,
        //     expires: new Date(0),
        //     secure: false,
        // });
        // res.status(401).json({ success: true, message: 'success logout' });
        res.cookie('GamingAuthToken','',{
            httpOnly:true,
            sameSite:'none',
            maxAge:new Date(0)
        }).status(201).json({success:true,message:'user logout successfully'})
    } catch (error) {
        res.status(401).json({ success: false, message: 'failed' });
    }
};
