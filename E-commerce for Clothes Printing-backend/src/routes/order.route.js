import { Router } from "express";
import {
  createOrder,
  getAllOrder,
  getOrderById,
  getUserOrders,
} from "../controllers/order.controller.js";

const router = Router();

router.post("/createOrder", createOrder);
router.get("/allOrder", getAllOrder);
router.get("/userOrder/:userId", getUserOrders);
router.get("/orderDetails/:orderId", getOrderById);

export default router;
