import React, { useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { BsCreditCard } from "react-icons/bs";
import { HiOutlineTruck, HiTruck } from "react-icons/hi2";
import { ImMobile } from "react-icons/im";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Payment = () => {
  const { user } = useContext(AuthContext);
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [selected, setSelected] = useState("Card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    month: "",
    year: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");
  const [totalAmount, setTotalAmount] = useState(null);
  const { userDetails } = useSelector((state) => state.shippingDetails);
  const [items, setItems] = useState(null);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/payment/processPayment",
        {
          amount: totalAmount,
          userId: user._id,
          paymentMethod,
        }
      );

      const options = {
        key: data.razorpayKey,
        currency: "INR",
        name: "Your Store",
        description: "Test transaction",
        order_id: data.order.id,
        handler: async function (response) {
          const { data: verifiedPayment } = await axios.post(
            "http://localhost:8000/api/payment/verifyPayment",
            {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              userId: user._id,
            }
          );
          const productIds = items.map((item) => item._id);
          await axios.post("http://localhost:8000/api/order/createOrder", {
            customerId: user._id,
            product: productIds,
            deliveryAddress: userDetails,
            payment: verifiedPayment.payment._id,
          });

          await axios.delete(
            `http://localhost:8000/api/cart/deleteUserCart/${user._id}`
          );
          window.location.href = `/order-details/${newOrder.order._id}`;
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed.");
    }
  };

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => console.log("Razorpay SDK Loaded");
      document.body.appendChild(script);
    }

    const fetchCartItems = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/cart/userCart/${user._id}`
        );
        const cartItemsPrices = res.data.map((item) => item.product.price);
        const sum = cartItemsPrices.reduce((acc, curr) => acc + curr, 0);
        setTotalAmount(sum);
        const cartItems = res.data.map((cart) => ({
          cartId: cart._id,
          ...cart.product,
        }));
        setItems(cartItems);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[650px] h-[500px]">
        <h1 className="text-xl font-semibold text-gray-700 text-center mb-6">
          Select Payment Method
        </h1>

        <div className="flex">
          <div className="w-1/3">
            <ul className="text-left text-sm font-medium text-gray-600 space-y-2">
              <li
                className={`cursor-pointer ${
                  paymentMethod === "Card" && "text-blue-500"
                } hover:bg-blue-100 pl-2 py-2 rounded-l-md text-lg ${
                  selected == "Card" ? "bg-gray-100" : ""
                } flex items-center gap-2`}
                onClick={() => {
                  setPaymentMethod("Card");
                  setSelected("Card");
                }}
              >
                <BsCreditCard /> Card
              </li>
              <li
                className={`cursor-pointer ${
                  paymentMethod === "UPI" && "text-blue-500"
                } hover:bg-blue-100 pl-2 py-2 rounded-l-md text-lg ${
                  selected == "UPI" ? "bg-gray-100" : ""
                } flex items-center gap-2`}
                onClick={() => {
                  setPaymentMethod("UPI");
                  setSelected("UPI");
                }}
              >
                <ImMobile /> UPI
              </li>
              <li
                className={`cursor-pointer ${
                  paymentMethod === "COD" && "text-blue-500"
                } hover:bg-blue-100 pl-2 py-2 rounded-l-md text-lg ${
                  selected == "COD" ? "bg-gray-100" : ""
                } flex items-center gap-2`}
                onClick={() => {
                  setPaymentMethod("COD");
                  setSelected("COD");
                }}
              >
                <HiTruck /> Cash on Delivery
              </li>
            </ul>
          </div>

          <div className="w-2/3 bg-gray-100 h-[400px] rounded-r-md flex flex-col p-3 pt-7">
            {paymentMethod === "Card" && (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="border rounded px-4 py-2 w-full"
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="MM"
                    className="border rounded px-4 py-2 w-1/2"
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, month: e.target.value })
                    }
                  />
                  <span className="text-gray-600">/</span>
                  <input
                    type="text"
                    placeholder="YY"
                    className="border rounded px-4 py-2 w-1/2"
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, year: e.target.value })
                    }
                  />
                </div>
                <input
                  type="password"
                  placeholder="CVV"
                  className="border rounded px-4 py-2 w-full"
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                />
              </div>
            )}

            {paymentMethod === "UPI" && (
              <input
                type="text"
                placeholder="Enter UPI ID"
                className="border rounded px-4 py-2 w-full"
                onChange={(e) => setUpiId(e.target.value)}
              />
            )}

            {paymentMethod === "COD" && (
              <div className="text-center text-green-600 font-medium">
                Cash on Delivery selected!
                <p className="text-sm text-gray-600">
                  Pay when you receive your order.
                </p>
              </div>
            )}

            <button
              className="bg-blue-500 text-white font-medium px-4 py-2 rounded w-full mt-4 hover:bg-blue-600 transition-all"
              onClick={handlePayment}
            >
              {paymentMethod === "COD"
                ? "Confirm Order"
                : `Pay Now ₹${totalAmount}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
