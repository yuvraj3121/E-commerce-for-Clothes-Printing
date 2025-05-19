import { Cart } from "../models/cart.model.js";

const addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res
      .status(400)
      .json({ message: "User ID and Product ID are required" });
  }

  try {
    const newCartItem = await Cart.create({
      user: userId,
      product: productId,
    });

    res
      .status(201)
      .json({ message: "Product added to cart", cartItem: newCartItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
};

const getUserCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await Cart.find({ user: userId }).populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Cart.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart item deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting item", error: error.message });
  }
};

const deleteUserCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const result = await Cart.deleteMany({ user: userId });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No cart items found for this user" });
    }

    res
      .status(200)
      .json({
        message: "Cart items deleted successfully",
        deletedCount: result.deletedCount,
      });
  } catch (error) {
    console.error("Error deleting cart items:", error);
    res.status(500).json({ message: "Server error while deleting cart items" });
  }
};

export { addToCart, getUserCart, deleteCartItem, deleteUserCart };
