import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "" },
  category: { type: String, default: "general" },
  description: { type: String, default: "" },
});

const Product = mongoose.model("Product", productSchema);

export default Product;