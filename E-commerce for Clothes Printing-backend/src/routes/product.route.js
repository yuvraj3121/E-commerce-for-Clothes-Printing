import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/createProduct",
  upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
  ]),
  (err, req, res, next) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }
    next();
  },
  createProduct
);
router.patch(
  "/updateProduct/:id",
  upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
  ]),
  (err, req, res, next) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }
    next();
  },
  updateProduct
);
router.get("/allProduct", getAllProducts);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
