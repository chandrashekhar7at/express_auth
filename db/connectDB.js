import mongoose from "mongoose"

// mongoose.set('strictQuery',false)

const connectDB = async (DATABASE_URL)=>{
    try {
        const dbOptions = {
            user : 'spinuser',
            pass:'9634Gamer7',
            dbname : 'spinGamer',
            authSource:'spinGamer'
        }
        const conn = await mongoose.connect(DATABASE_URL,dbOptions)
        console.log('connection created')
    } catch (error) {
        console.log('connection failed',error)
    }
}
export default connectDB



