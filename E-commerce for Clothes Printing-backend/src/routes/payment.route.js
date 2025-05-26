import express from "express";
import {
  processPayment,
  updatePaymentMethod,
  verifyPayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/processPayment", processPayment);
router.post("/verifyPayment", verifyPayment);

router.patch("/updatePaymentMethod", updatePaymentMethod);

export default router;
