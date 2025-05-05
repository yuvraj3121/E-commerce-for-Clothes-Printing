import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    frontDesign: {
      type: String,
    },
    backDesign: {
      type: String,
    },
    printLocation: {
      type: [String],
    },
    sizes: [
      {
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    color: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
