import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js"; 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


mongoose
  .connect("mongodb://127.0.0.1:27017/glamcart")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));


app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("GlamCart Backend is running!");
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
