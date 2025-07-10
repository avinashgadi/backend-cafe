import dotenv from "dotenv";
dotenv.config()
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import cors from "cors"
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const DB_USER=process.env.DB_USER;
const PASSWORD=process.env.DB_PASSWORD;
mongoose.connect( `mongodb+srv://${DB_USER}:${PASSWORD}@cluster0.ea0md1f.mongodb.net/merncafe?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
  app.listen(8080, () => {
    console.log("Server started");
  });
});
// mongoose.connect('mongodb://localhost:27017/backend').then(()=>{

// });
app.use("/api/users", userRouter);