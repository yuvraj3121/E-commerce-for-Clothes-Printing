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

export { addToCart, getUserCart, deleteCartItem };
