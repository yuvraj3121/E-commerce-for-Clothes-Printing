import express from "express";
import {
  signUpUser,
  loginUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signUp", signUpUser);
router.post("/login", loginUser);
router.get("/profile", protect, (req, res) => {
  res.json({ user: req.user });
});
router.get("/userProfile/:id", getUserProfile);

export default router;
