import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const OrderReview = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { userDetails } = useSelector((state) => state.shippingDetails);
  const { totalAmount } = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("Razorpay SDK Loaded");
        document.body.appendChild(script);
      }

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

  const handlePlaceOrder = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/payment/processPayment",
        {
          amount: totalAmount,
          userId: user._id,
        }
      );

      const options = {
        key: data.razorpayKey,
        currency: "INR",
        name: "Design Drip",
        description: "Test transaction",
        order_id: data.order.id,
        handler: async function (response) {
          console.log("Payment Response:", response);
          const { data: verifiedPayment } = await axios.post(
            "http://localhost:8000/api/payment/verifyPayment",
            {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              userId: user._id,
            }
          );

          const productIds = cartItems.map((item) => item._id);
          const res = await axios.post(
            "http://localhost:8000/api/order/createOrder",
            {
              customerId: user._id,
              product: productIds,
              deliveryAddress: userDetails,
              payment: verifiedPayment.payment._id,
            }
          );

          const { data: paymentDetails } = await axios.patch(
            `http://localhost:8000/api/payment/updatePaymentMethod`,
            {
              id: verifiedPayment.payment._id,
              paymentId: response.razorpay_payment_id,
              orderId: res.data.order._id,
            }
          );
          console.log("Payment details :", paymentDetails);

          await axios.delete(
            `http://localhost:8000/api/cart/deleteUserCart/${user._id}`
          );
          window.location.href = "/";
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed.");
    }
  };

  const handleBack = () => {
    navigate("/shippingDetails");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 flex-col">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="text-blue-600 hover:bg-blue-100 hover:text-blue-800 font-medium"
          >
            ← Back to Shipping
          </button>
          <h2 className="text-2xl font-semibold">Order Review</h2>
        </div>

        <div className="mb-6 bg-gray-100 p-4 text-left">
          <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>
          <div className="grid gap-2">
            <div className="flex gap-2">
              <strong className="w-32">Name:</strong>
              <span>{userDetails?.fullName}</span>
            </div>
            <div className="flex gap-2">
              <strong className="w-32">Email:</strong>
              <span>{userDetails?.email}</span>
            </div>
            <div className="flex gap-2">
              <strong className="w-32">Phone:</strong>
              <span>{userDetails?.phone}</span>
            </div>
            <div className="flex gap-2">
              <strong className="w-32">Address:</strong>
              <span>{userDetails?.address}</span>
            </div>
            <div className="flex gap-2">
              <strong className="w-32">City:</strong>
              <span>{userDetails?.city}</span>
            </div>
            <div className="flex gap-2">
              <strong className="w-32">State:</strong>
              <span>{userDetails?.state}</span>
            </div>
            <div className="flex gap-2">
              <strong className="w-32">Zip Code:</strong>
              <span>{userDetails?.zip}</span>
            </div>
            <div className="flex gap-2">
              <strong className="w-32">Country:</strong>
              <span>{userDetails?.country}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <ul className="space-y-4">
            {cartItems?.map((item) => (
              <div
                key={item.id}
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
                  <p className="text-sm font-semibold">Price: ₹{item.price}</p>
                </div>
              </div>
            ))}
          </ul>
          <div className="w-full md:w-1/3 border border-gray-200 rounded p-5 h-fit ml-[290px]">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
