import Stripe from "stripe";
import Payment from "../models/payment.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPayment = async (req, res) => {
  const { amount, userId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });

    const payment = await Payment.create({
      userId,
      amount,
      paymentIntentId: paymentIntent.id,
      status: "pending",
    });

    res.status(200).json({
      message: "Payment Successful.",
      payment,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createPayment };
