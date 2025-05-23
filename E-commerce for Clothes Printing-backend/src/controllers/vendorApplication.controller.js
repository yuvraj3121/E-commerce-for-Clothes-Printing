import mongoose from "mongoose";
import { VendorApplication } from "../models/vendorApplication.model.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerVendor = async (req, res) => {
  const { userId } = req.params;

  const user = await VendorApplication.findOne({ userId });

  if (user) return res.status(400).json({ message: "Already applied!" });

  try {
    const {
      fullName,
      email,
      phone,
      businessName,
      printingType,
      services,
      address,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !businessName ||
      !printingType ||
      !services ||
      !address
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const parsedprintingType = JSON.parse(printingType);
    const parsedservices = JSON.parse(services);
    const parsedAddress = JSON.parse(address);
    const documentLocalPath = req.files?.requiredDocuments?.[0]?.path;

    const requiredDocuments = documentLocalPath
      ? await uploadOnCloudinary(documentLocalPath)
      : null;

    const newVendorApplication = await VendorApplication.create({
      userId,
      fullName,
      email,
      phone,
      businessName,
      printingType: parsedprintingType,
      services: parsedservices,
      address: parsedAddress,
      requiredDocuments: requiredDocuments?.url,
    });

    res.status(201).json({
      message: "Vendor application submitted for approval!",
      vendor: newVendorApplication,
    });
  } catch (error) {
    console.error("Error registering vendor:", error);
    res
      .status(500)
      .json({ message: "Failed to register vendor", error: error.message });
  }
};

const getVendorByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const vendor = await VendorApplication.findOne({ userId });
    if (!vendor) return res.status(400).json({ message: "Not applied!" });

    res.status(200).json({
      message: "feteched successfully.",
      vendor,
    });
  } catch (error) {
    console.error("Error fetching vendor:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch vendor data.", error: error.message });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const vendors = await VendorApplication.find({});

    res.status(200).json({
      message: "Vendors fetched successfully.",
      count: vendors.length,
      vendors,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching vendors." });
  }
};

const getVendorById = async (req, res) => {
  const vendorId = req.params.vendorId;
  try {
    const vendor = await VendorApplication.findById(vendorId);
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });

    res.status(200).json({ vendor });
  } catch (error) {
    res.status(500).json({ error: "Error fetching vendor." });
  }
};

const changeVendorStatus = async (req, res) => {
  const { userId, vendorId } = req.body;
  console.log(userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.role = "vendor";
    await user.save();

    const vendor = await VendorApplication.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    vendor.status = "accepted";
    await vendor.save();

    res.status(200).json({ message: "Vendor status updated successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Vendor status update failed.", error: error });
  }
};

const deleteVendorApplication = async (req, res) => {
  const { vendorId } = req.params;

  try {
    const deletedVendor = await VendorApplication.findByIdAndDelete(vendorId);

    if (!deletedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({
      message: "Vendor Application deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Vendor application deletion failed.", error: error });
  }
};

const assignOrder = async (req, res) => {
  const { orderId, vendorId } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found." });

    const vendor = await VendorApplication.findById(vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found." });

    const updatedVendor = await VendorApplication.findByIdAndUpdate(
      vendorId,
      { $push: { orders: orderId } },
      { new: true }
    );

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "Under Process", vendor: vendorId },
      { new: true }
    );

    res.status(200).json({
      message: "Order assigned successfully.",
      vendor: updatedVendor,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error assigning order:", error.message);
    res
      .status(500)
      .json({ message: "Error assigning order.", error: error.message });
  }
};

const updateDetails = async (req, res) => {
  const vendorId = req.params.vendorId;
  const { printingType, services } = req.body;

  try {
    const newVendor = await VendorApplication.findByIdAndUpdate(
      vendorId,
      {
        printingType: printingType,
        services: services,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Updated successfully.",
      vendor: newVendor,
    });
  } catch (error) {
    console.error("Error updating details:", error.message);
    res
      .status(500)
      .json({ message: "Error updating details.", error: error.message });
  }
};

export {
  registerVendor,
  getVendorByUserId,
  getAllVendors,
  getVendorById,
  changeVendorStatus,
  deleteVendorApplication,
  assignOrder,
  updateDetails,
};
