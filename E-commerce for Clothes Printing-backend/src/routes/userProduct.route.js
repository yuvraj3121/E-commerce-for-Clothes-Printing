import { Router } from "express";
import {
  createUserProduct,
  deleteUserProduct,
} from "../controllers/userProduct.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/createUserProduct",
  upload.fields([
    { name: "frontDesignImage", maxCount: 1 },
    { name: "backDesignImage", maxCount: 1 },
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
router.delete("/deleteUserProduct/:id", deleteUserProduct);

export default router;
