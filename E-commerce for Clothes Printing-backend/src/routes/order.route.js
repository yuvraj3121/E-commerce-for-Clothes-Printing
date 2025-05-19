import { Router } from "express";
import {
  createOrder,
  getAllOrder,
  getUserOrders,
} from "../controllers/order.controller.js";

const router = Router();

router.post("/createOrder", createOrder);
router.get("/allOrder", getAllOrder);
router.get("/userOrder/:userId", getUserOrders);

export default router;
