import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const OrderReview = () => {
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.shippingDetails);
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  // console.log(userDetails);

  const handlePlaceOrder = () => {
    navigate("/payment");
  };

  const handleBack = () => {
    navigate("/shipping");
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
              <span>{userDetails.fullName}</span>
            </div>
            <div className="flex gap-2">
              <strong className="w-32">Email:</strong>
              <span>{userDetails.email}</span>
            </div>
            <div className="flex gap-2">
              <strong className="w-32">Phone:</strong>
              <span>{userDetails.phone}</span>
            </div>
            <div className="flex gap-2">
              <strong className="w-32">Address:</strong>
              <span>{userDetails.address}</span>
            </div>
            <div className="flex gap-2">
              <strong className="w-32">City:</strong>
              <span>{userDetails.city}</span>
            </div>
            <div className="flex gap-2">
              <strong className="w-32">State:</strong>
              <span>{userDetails.state}</span>
            </div>
            <div className="flex gap-2">
              <strong className="w-32">Zip Code:</strong>
              <span>{userDetails.zip}</span>
            </div>
            <div className="flex gap-2">
              <strong className="w-32">Country:</strong>
              <span>{userDetails.country}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <ul className="space-y-4">
            {cartItems.map((item) => (
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
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
