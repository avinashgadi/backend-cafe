import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    productName: { type: String },
    description: { type: String },
    price: { type: Number },
    imgUrl: { type: "String" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
