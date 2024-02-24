import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import auth from "./routes/authRoute.js";
import connectDB from "./db/connectDB.js";
import path from 'path';

dotenv.config();
const port = process.env.PORT || 8000; 
const DATABASE_URL = process.env.DATABASE_URL;

connectDB(DATABASE_URL)

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://jiospin.vercel.app")
  next()
})

app.use(
  cors({
    origin: "http://jiospin.info",
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
