import { DeliveryPartner } from "../models/deliveryPartner.model.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerDeliveryPartner = async (req, res) => {
  const { userId } = req.params;

  const user = await DeliveryPartner.findOne({ userId });

  if (user) return res.status(400).json({ message: "Already applied!" });

  try {
    const { fullName, email, phone, address } = req.body;

    if (!fullName || !email || !phone || !address) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const parsedAddress = JSON.parse(address);
    const documentLocalPath = req.files?.requiredDocuments?.[0]?.path;

    const requiredDocuments = documentLocalPath
      ? await uploadOnCloudinary(documentLocalPath)
      : null;

    const newDeliveryPartner = await DeliveryPartner.create({
      userId,
      fullName,
      email,
      phone,
      address: parsedAddress,
      requiredDocuments: requiredDocuments?.url,
    });

    res.status(201).json({
      message: "Application submitted for approval!",
      deliveryPartner: newDeliveryPartner,
    });
  } catch (error) {
    console.error("Error registering Delivery Partner:", error);
    res.status(500).json({
      message: "Failed to register Delivery Partner",
      error: error.message,
    });
  }
};

const getDeliveryPartnerByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const deliveryPartner = await DeliveryPartner.findOne({ userId });
    if (!deliveryPartner)
      return res.status(400).json({ message: "Not applied!" });

    res.status(200).json({
      message: "feteched successfully.",
      deliveryPartner,
    });
  } catch (error) {
    console.error("Error fetching Delivery Partner:", error.message);
    res.status(500).json({
      message: "Failed to fetch Delivery Partner data.",
      error: error.message,
    });
  }
};

const getAllDeliveryPartners = async (req, res) => {
  try {
    const deliveryPartners = await DeliveryPartner.find({});

    res.status(200).json({
      message: "Delivery Partners fetched successfully.",
      count: deliveryPartners.length,
      deliveryPartners,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching Delivery Partners." });
  }
};

const getDeliveryPartnerById = async (req, res) => {
  const deliveryPartnerId = req.params.deliveryPartnerId;
  try {
    const deliveryPartner = await DeliveryPartner.findById(deliveryPartnerId);
    if (!deliveryPartner)
      return res.status(404).json({ error: "Delivery Partner not found" });

    res.status(200).json({ deliveryPartner });
  } catch (error) {
    res.status(500).json({ error: "Error fetching Delivery Partner." });
  }
};

const changeDeliveryPartnerStatus = async (req, res) => {
  const { userId, deliveryPartnerId } = req.body;
  console.log(userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.role = "deliveryPartner";
    await user.save();

    const deliveryPartner = await DeliveryPartner.findById(deliveryPartnerId);
    if (!deliveryPartner) {
      return res.status(404).json({ error: "Delivery Partner not found" });
    }
    deliveryPartner.status = "accepted";
    await deliveryPartner.save();

    res
      .status(200)
      .json({ message: "Delivery Partner status updated successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Delivery Partner status update failed.",
      error: error,
    });
  }
};

const deleteDeliveryPartnerApplication = async (req, res) => {
  const { deliveryPartnerId } = req.params;

  try {
    const deletedDeliveryPartner = await DeliveryPartner.findByIdAndDelete(
      deliveryPartnerId
    );

    if (!deletedDeliveryPartner) {
      return res.status(404).json({ message: "Delivery Partner not found" });
    }

    res.status(200).json({
      message: "Delivery Partner Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delivery Partner application deletion failed.",
      error: error,
    });
  }
};

const assignOrder = async (req, res) => {
  const { orderId, deliveryPartnerId } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found." });

    const deliveryPartner = await DeliveryPartner.findById(deliveryPartnerId);
    if (!deliveryPartner)
      return res.status(404).json({ message: "Delivery Partner not found." });

    const updatedDeliveryPartner = await DeliveryPartner.findByIdAndUpdate(
      deliveryPartnerId,
      { $push: { orders: orderId } },
      { new: true }
    );

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "Shipped", deliveryPartner: deliveryPartnerId },
      { new: true }
    );

    res.status(200).json({
      message: "Order assigned successfully.",
      deliveryPartner: updatedDeliveryPartner,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error assigning order:", error.message);
    res
      .status(500)
      .json({ message: "Error assigning order.", error: error.message });
  }
};

export {
  registerDeliveryPartner,
  getDeliveryPartnerByUserId,
  getAllDeliveryPartners,
  getDeliveryPartnerById,
  changeDeliveryPartnerStatus,
  deleteDeliveryPartnerApplication,
  assignOrder,
};
