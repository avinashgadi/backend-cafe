import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
const Router = express.Router();
import {
  register,
  login,
  profile,
  updateUser,
  deleteUser,
  showUsers,
  updateProfile,
  getUser,
  addUser,
} from "../controllers/userController.js";

//user routes
Router.post("/register", register);
Router.post("/login", login);
Router.get("/:id/profile", profile);
Router.patch("/:id/profile", updateProfile);

//admin routes
Router.get("/",  showUsers);
Router.post("/",  addUser);
Router.get("/:id",   getUser);
Router.patch("/:id",  updateUser);
Router.delete("/:id",   deleteUser);

export default Router;
