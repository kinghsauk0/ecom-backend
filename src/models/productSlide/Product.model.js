import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    slide: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
