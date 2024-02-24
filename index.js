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

// Set the specific origin of your frontend
const allowedOrigins = [
  "https://www.jiospin.info", // Add your frontend URL here
  // Add more origins if needed
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
