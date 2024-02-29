import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import auth from "./routes/authRoute.js";
import connectDB from "./db/connectDB.js";
import cors from "cors"; // Import cors

dotenv.config();
const port = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017';

connectDB(DATABASE_URL);
// mongoose.connect('mongodb+srv://spinuser:9634Gamer7@cluster0.1cehtmy.mongodb.net/spinGamer?retryWrites=true&w=majority&appName=Cluster0')
// .then((res)=>{
//     console.log(res)
// })
// .catch((err)=>{
//     console.log(err)
// })
const app = express();

app.use(cookieParser());
app.use(express.json());

// Use cors middleware
app.use(cors({
  origin:'https://baseergaming.com',
  credentials:true
}));

app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
