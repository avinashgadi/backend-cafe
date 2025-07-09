import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import {
  register,
  login,
  showUsers,
  updateUser,
  deleteUser,
  profile,
  updateProfile,
  getUser,
} from "../controllers/userController.js";

const app = express();

app.use(express.json());

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json({ message: "Hello from server!!" })
})
userRouter.post("/register", register); // user registration
userRouter.post("/login", login); // login user
userRouter.get("/:id/profile", authenticate, profile); // view own (user) profile
userRouter.patch("/:id/profile", authenticate, updateProfile) // update logged-in user(own profile)
// userRouter.patch("/:id/password", ) // change password (with old password)
userRouter.get("/showusers", authenticate, authorize("admin"), showUsers); // view all users
userRouter.get("/:id", authenticate, authorize("admin"), getUser) // get a user by ID
userRouter.patch("/:id", authenticate, authorize("admin"), updateUser); // update a user
userRouter.delete("/:id", authenticate, authorize("admin"), deleteUser); // delete a user

export default userRouter;