import Razorpay from "razorpay";
import { Payment } from "../models/payment.model.js";
import crypto from "crypto";
import axios from "axios";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const processPayment = async (req, res) => {
  const { amount, userId } = req.body;

  try {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `rec_${userId}_${currentDate}`,
    };

    const order = await razorpayInstance.orders.create(options);

    const newPayment = await Payment.create({
      userId,
      amount,
      razorpayOrderId: order.id,
      status: "Pending",
    });

    res.status(200).json({
      order,
      payment: newPayment,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Payment processing failed", error });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, userId } =
    req.body;

  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const updatedPayment = await Payment.findOneAndUpdate(
      { razorpayOrderId },
      { $set: { razorpayPaymentId, status: "Paid" } },
      { new: true }
    );

    res.status(200).json({
      message: "Payment verified successfully",
      payment: updatedPayment,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Payment verification failed", error });
  }
};

const updatePaymentMethod = async (req, res) => {
  const { id, paymentId, orderId } = req.body;
  try {
    const razorpayResponse = await axios.get(
      `https://api.razorpay.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
          ).toString("base64")}`,
        },
      }
    );

    const payment = await Payment.findByIdAndUpdate(
      id,
      {
        paymentMethod: razorpayResponse.data.method,
        orderId: orderId,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Payment method updated successfully.",
      payment: payment,
    });
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ message: "Failed to fetch payment details", error });
  }
};

export { processPayment, verifyPayment, updatePaymentMethod };
