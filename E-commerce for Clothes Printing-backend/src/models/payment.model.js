import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["succeeded", "pending", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Payement = mongoose.model("Payment", paymentSchema);
