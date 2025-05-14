import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

export { app };
