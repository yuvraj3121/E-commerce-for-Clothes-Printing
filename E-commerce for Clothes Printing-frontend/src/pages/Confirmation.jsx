import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToOrders } from "../features/ordersSlice.js";
import { clearCart } from "../features/cartSlice.js";

const Confirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showConfetti, setShowConfetti] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  console.log("before", cartItems);

  useEffect(() => {
    setShowConfetti(true);
    const date = new Date();
    const formattedDate = date
      .toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .replace(",", "");

    cartItems.map((item) =>
      dispatch(addToOrders({ ...item, orderedOn: formattedDate }))
    );
    dispatch(clearCart());
    console.log("after", cartItems);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center relative overflow-hidden max-w-md w-full">
        {showConfetti && (
          <div className="absolute inset-0 z-0 pointer-events-none animate-ping-slow">
            <div className="w-full h-full bg-[url('https://cdn.jsdelivr.net/gh/Anujarya300/burst/confetti.gif')] bg-cover opacity-80 blur-sm"></div>
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center space-y-4">
          <CheckCircle2 className="text-green-500 w-16 h-16" />
          <h2 className="text-2xl font-bold text-gray-800">
            Payment Successful!
          </h2>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been placed and will be
            processed soon.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
