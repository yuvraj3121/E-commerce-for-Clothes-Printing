import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const { totalAmount } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handlePayment = () => {
    // alert(`Payment method selected: ${selectedMethod}`);
    navigate("/confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Choose Payment Method</h2>

        <div className="space-y-4">
          <div
            className={`p-4 border rounded-md cursor-pointer ${
              selectedMethod === "card"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedMethod("card")}
          >
            <h3 className="font-medium">Credit/Debit Card</h3>
            {selectedMethod === "card" && (
              <div className="mt-3 space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-4 py-2 border rounded-md"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-1/2 px-4 py-2 border rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-1/2 px-4 py-2 border rounded-md"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Name on Card"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
            )}
          </div>

          <div
            className={`p-4 border rounded-md cursor-pointer ${
              selectedMethod === "upi"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedMethod("upi")}
          >
            <h3 className="font-medium">UPI</h3>
            {selectedMethod === "upi" && (
              <input
                type="text"
                placeholder="Enter UPI ID (e.g., yuvraj@upi)"
                className="mt-3 w-full px-4 py-2 border rounded-md"
              />
            )}
          </div>

          <div
            className={`p-4 border rounded-md cursor-pointer ${
              selectedMethod === "cod"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedMethod("cod")}
          >
            <h3 className="font-medium">Cash on Delivery</h3>
            {selectedMethod === "cod" && (
              <p className="text-sm text-gray-600 mt-2">
                You’ll pay when the product is delivered.
              </p>
            )}
          </div>
        </div>
        <button
          className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
          onClick={handlePayment}
        >
          Pay Now ₹{totalAmount}
        </button>
      </div>
    </div>
  );
};

export default Payment;
