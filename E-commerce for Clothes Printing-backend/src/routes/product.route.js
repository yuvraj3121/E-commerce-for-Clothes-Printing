import { Router } from "express";
import { createProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// router.post(
//   "/createProduct",
//   upload.fields([
//     { name: "productImage", maxCount: 1 },
//     { name: "frontDesign", maxCount: 1 },
//     { name: "backDesign", maxCount: 1 },
//   ]),
//   (err, req, res, next) => {
//     if (err) {
//       return res
//         .status(400)
//         .json({ message: "File upload error", error: err.message });
//     }
//     next();
//   },
//   createProduct
// );

router.post(
  "/createProduct",
  upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "frontDesign", maxCount: 1 },
    { name: "backDesign", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("req.files:", req.files);
    if (!req.files.productImage) {
      return res.status(400).json({ message: "No product image uploaded" });
    }
    res
      .status(200)
      .json({ message: "Files uploaded successfully", files: req.files });
  }
);

export default router;
