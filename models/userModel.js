import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String },
    status: { type: String },
  }, { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;