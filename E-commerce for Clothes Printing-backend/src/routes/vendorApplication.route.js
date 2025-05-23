import { Router } from "express";
import {
  assignOrder,
  changeVendorStatus,
  deleteVendorApplication,
  getAllVendors,
  getVendorById,
  getVendorByUserId,
  registerVendor,
  updateDetails,
} from "../controllers/vendorApplication.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/registerVendor/:userId",
  upload.fields([{ name: "requiredDocuments", maxCount: 1 }]),
  (err, req, res, next) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }
    next();
  },
  registerVendor
);
router.get("/vendorDataByUserId/:userId", getVendorByUserId);
router.get("/AllVendors", getAllVendors);
router.get("/vendorData/:vendorId", getVendorById);
router.patch("/changeVendorStatus", changeVendorStatus);
router.delete("/deleteVendor/:vendorId", deleteVendorApplication);
router.patch("/assignOrder", assignOrder);
router.patch("/updateDetails/:vendorId", updateDetails);

export default router;
