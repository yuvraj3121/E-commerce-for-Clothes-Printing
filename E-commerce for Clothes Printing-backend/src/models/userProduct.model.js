import mongoose from "mongoose";

const userProductSchema = new mongoose.Schema(
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
    productImage: [
      {
        side: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    frontDesignImage: {
      type: String,
    },
    backDesignImage: {
      type: String,
    },
    frontDesignText: {
      type: String,
    },
    backDesignText: {
      type: String,
    },
    printLocation: {
      type: [String],
    },
    customizedFrontImage: {
      type: String,
    },
    customizedBackImage: {
      type: String,
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

export const userProduct = mongoose.model("userProduct", userProductSchema);
