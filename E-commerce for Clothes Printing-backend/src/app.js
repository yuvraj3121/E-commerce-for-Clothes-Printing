import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import userProductRoutes from "./routes/userProduct.route.js";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";
import cartRoutes from "./routes/cart.route.js";
import vendorRoutes from "./routes/vendorApplication.route.js";
import paymentRoutes from "./routes/payment.route.js";

const app = express();
app.use(
  cors({
    origin: ["https://designdrip-v1.netlify.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/userProduct", userProductRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/payment", paymentRoutes);

export { app };
