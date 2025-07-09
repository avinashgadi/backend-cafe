import dotenv from "dotenv";
dotenv.config()
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
const app = express();
app.use(express.json());
const DB_USER=process.env.DB_USER;
const PASSWORD=process.env.DB_PASSWORD;
mongoose.connect( `mongodb+srv://${DB_USER}:${PASSWORD}@cluster0.ea0md1f.mongodb.net/merncafe?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
  app.listen(8080, () => {
    console.log("Server started");
  });
});
app.use("/api/users", userRouter);