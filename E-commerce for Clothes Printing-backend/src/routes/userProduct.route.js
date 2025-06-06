import { Router } from "express";
import {
  createUserProduct,
  deleteUserProduct,
  getProductById,
} from "../controllers/userProduct.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/createUserProduct",
  upload.fields([
    { name: "frontDesignImage", maxCount: 1 },
    { name: "backDesignImage", maxCount: 1 },
    { name: "customizedFrontImage", maxCount: 1 },
    { name: "customizedBackImage", maxCount: 1 },
  ]),
  (err, req, res, next) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }
    next();
  },
  createUserProduct
);
router.get("/getProductById/:productId", getProductById);
router.delete("/deleteUserProduct/:id", deleteUserProduct);

export default router;
