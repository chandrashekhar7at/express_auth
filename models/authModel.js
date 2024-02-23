import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    deposite:{
        type:Number,
        default:100
    },
    winning:{
        type:Number,
        default:0
    }
},{timestamps:true})

const userModel = mongoose.model('userAuth',userSchema)
export default userModel