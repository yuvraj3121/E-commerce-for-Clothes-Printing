import { Router } from "express";
import {
  assignOrder,
  changeDeliveryPartnerStatus,
  deleteDeliveryPartnerApplication,
  getAllDeliveryPartners,
  getDeliveryPartnerById,
  getDeliveryPartnerByUserId,
  registerDeliveryPartner,
} from "../controllers/deliveryPartner.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/registerDeliveryPartner/:userId",
  upload.fields([{ name: "requiredDocuments", maxCount: 1 }]),
  (err, req, res, next) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }
    next();
  },
  registerDeliveryPartner
);
router.get("/deliveryPartnerDataByUserId/:userId", getDeliveryPartnerByUserId);
router.get("/AllDeliveryPartners", getAllDeliveryPartners);
router.get("/deliveryPartnerData/:deliveryPartnerId", getDeliveryPartnerById);
router.patch("/changeDeliveryPartnerStatus", changeDeliveryPartnerStatus);
router.delete(
  "/deleteDeliveryPartner/:deliveryPartnerId",
  deleteDeliveryPartnerApplication
);
router.patch("/assignOrder", assignOrder);

export default router;
