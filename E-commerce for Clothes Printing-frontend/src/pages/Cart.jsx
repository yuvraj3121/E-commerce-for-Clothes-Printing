import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  incrementCartCount,
  decrementCartCount,
  updateQuantity,
  setTotalAmount,
} from "../features/cartSlice";
import axios from "axios";
import { TbArrowWaveLeftDown } from "react-icons/tb";

const Cart = ({}) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/cart/userCart/${user._id}`
        );
        const items = res.data.map((cart) => ({
          cartId: cart._id,
          ...cart.product,
        }));
        setCartItems(items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCartItems();
  }, [user._id]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  // const { cartItems } = useSelector((state) => state.cart);

  console.log(cartItems);

  const handleRemove = async (productId, cartId) => {
    // console.log(productId);
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/cart/removeCartItem/${cartId}`
      );
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.cartId !== cartId)
      );

      await axios.delete(
        `http://localhost:8000/api/userProduct/deleteUserProduct/${productId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="absolute top-2 left-5 border border-black px-4 py-2 rounded cursor-pointer bg-white hover:bg-gray-100"
        onClick={() => navigate("/")}
      >
        Home
      </button>
      {!user ? (
        <div className="flex items-center justify-center h-screen">
          <h1>
            Please{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </h1>
        </div>
      ) : (
        <div className="max-w-[1200px] mx-auto p-5">
          <h1 className="text-2xl font-semibold mb-6">Your Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="mb-4">Your cart is empty</p>
              <button
                className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-red-500"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col md:flex-row gap-4 border border-gray-200 rounded p-4 mb-5"
                  >
                    <img
                      src={item.productImage[0].url}
                      alt={item.productName}
                      className="w-32 h-32 object-contain rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-1">
                        {item.productName}
                      </h3>
                      <p className="text-sm">Color: {item.color}</p>
                      {item.sizes.map((size) => (
                        <p key={size.size} className="text-sm">
                          {size.size}: {size.quantity}
                        </p>
                      ))}
                      <p className="text-sm">Quantity: {item.quantity}</p>
                      <p className="text-sm font-semibold">
                        Price: ₹{item.price}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => handleRemove(item._id, item.cartId)}
                        className="text-red-500 underline hover:text-red-700 hover:bg-red-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full md:w-1/3 border border-gray-200 rounded p-5 h-fit">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <button
                  className="bg-gray-800 text-white w-full py-3 mt-5 rounded hover:bg-red-500"
                  onClick={() => {
                    navigate("/shippingDetails");
                    dispatch(setTotalAmount(calculateTotal()));
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
