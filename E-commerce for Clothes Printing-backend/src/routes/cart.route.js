import express from "express";
import {
  addToCart,
  getUserCart,
  deleteCartItem,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/addToCart", addToCart);
router.get("/userCart/:userId", getUserCart);
router.delete("/removeCartItem/:id", deleteCartItem);

export default router;
