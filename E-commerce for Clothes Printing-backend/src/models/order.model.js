import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: [
      {
        type: Schema.Types.ObjectId,
        ref: "userProduct",
      },
    ],
    deliveryAddress: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["Pending", "Under Process", "Delivered", "Shipped", "Cancelled"],
      default: "Pending",
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "VendorApplication",
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
