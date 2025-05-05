import { Router } from "express";
import { createProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/createProduct",
  upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "frontDesign", maxCount: 1 },
    { name: "backDesign", maxCount: 1 },
  ]),
  createProduct
);

export default router;
