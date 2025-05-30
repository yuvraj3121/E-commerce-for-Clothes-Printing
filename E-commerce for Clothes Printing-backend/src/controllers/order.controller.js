import { Order } from "../models/order.model.js";

const createOrder = async (req, res) => {
  try {
    const { customerId, product, deliveryAddress, payment } = req.body;

    if (!customerId || !product || !deliveryAddress || !payment) {
      return res.status(400).json({ message: "All datas are required." });
    }

    const newOrder = await Order.create({
      customer: customerId,
      product: product,
      deliveryAddress,
      payment,
    });

    return res.status(201).json({
      message: "Order created successfully.",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer")
      .populate("product")
      .populate("payment")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All orders fetched successfully.",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

const getUserOrders = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ customer: userId })
      .populate("customer", "-password")
      .populate("product")
      .populate("payment")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "User orders fetched successfully.",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Failed to fetch user orders", error });
  }
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId)
      .populate("customer")
      .populate("product")
      .populate("payment");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({
      message: "Order fetched successfully.",
      order,
    });
  } catch (error) {
    console.error("Error fetching order:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch order.", error: error.message });
  }
};

const changeOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!status) return res.status(400).json({ message: "Status required." });

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(400).json({ message: "Order not found." });

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );

    res.status(200).json({
      message: "Order status updated successfully.",
      order: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error changing status." });
  }
};

export {
  createOrder,
  getAllOrder,
  getUserOrders,
  getOrderById,
  changeOrderStatus,
};
