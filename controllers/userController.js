import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
const SECRET = "sometxt";

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, status } = req.body;
    const hashesPassword = await bcrypt.hash(password, 10);
    const user = {
      firstName, lastName, email, password: hashesPassword, role, status
    };
    const result = await userModel.create(user);
    res.status(201).json({ message: "user registered successfully", result});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if(existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if(isMatch) {
        const userObj = {
          name: existingUser.name, email: existingUser.email, role: existingUser.role,
        };
        const token = jwt.sign(userObj, SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: "user logged-in successfully", user: userObj, token });
      } else {
        return res.status(400).json({ message: "invalid password" });
      }
    } else {
      return res.status(400).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}

const showUsers = async (req, res) => {
  try {
    const result = await userModel.find();
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "updated successfully", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted successfully", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}

const profile = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findOne({ _id: id });
    res.status(200).json({ message: "user profile", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}

const updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "profile updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findOne({ _id: id });
    res.status(200).json({ message: "user found", result });
  } catch (error) {
    console.log(error);
    res.status.json({ message: "something went wrong" });
  }
}


export { register, login, showUsers, updateUser, deleteUser, profile, updateProfile, getUser };