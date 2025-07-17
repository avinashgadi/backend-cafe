import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    orderValue: { type: Number },
    status: { type: String, default: "Pending" },
    email:{type:String},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [{ type: Object }],
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
