import mongoose from "mongoose"

mongoose.set('strictQuery',false)

const connectDB = async (DATABASE_URL)=>{
    try {
        const dbOptions = {
            user : process.env.user,
            pass:process.env.pass,
            dbname : process.env.dbname,
            authSource:process.env.authSource
        }
        const conn = await mongoose.connect(DATABASE_URL)
        console.log('connected')
    } catch (error) {
        console.log('connection failed',error)
    }
}
export default connectDB



// db.createUser({user:"csadmin",pwd:"cs123",roles:["root"]})
// db.createUser({user:"spinuser",pwd:"9634Gamer$7",roles:[{role:"readWrite",db:"spinGamer"}]})

// GIT_SSH_COMMAND="ssh -i ~/.ssh/react_ed25519" git pull