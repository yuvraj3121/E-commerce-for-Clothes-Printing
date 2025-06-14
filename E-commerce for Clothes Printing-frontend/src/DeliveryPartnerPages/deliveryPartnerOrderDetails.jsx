import axios from "axios";
import React, { useEffect, useState } from "react";

const DeliveryPartnerOrderDetails = ({ orderId, setViewDetails }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [orderStatus, setOrderStatus] = useState("Under Process");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `https://designdrip-v1.onrender.com/api/order/orderDetails/${orderId}`
        );
        setOrderDetails(res.data.order || {});
        setCustomerDetails(res.data.order.customer || {});
        setProductDetails(res.data.order.product || {});
        setDeliveryAddress(res.data.order.deliveryAddress || {});
        setPaymentDetails(res.data.order.payment || {});
        setOrderStatus(res.data.order.status);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
  }, [orderId, orderStatus, showOtpInput]);

  const handleOTP = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `https://designdrip-v1.onrender.com/api/order/updateStatus/${orderId}`,
        {
          status: "Delivered",
        }
      );
      console.log(res.data);
      alert("OTP verified successfully.");
      setShowOtpInput(false);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // console.log(productDetails);

  return (
    <div className={`flex flex-col h-screen bg-gray-100`}>
      <div>
        <div className="mb-6 flex flex-row justify-between items-center w-full px-4 py-2">
          <h1 className="text-3xl font-bold">Order Details</h1>
          <button
            className="text-lg cursor-pointer text-blue-400 hover:text-blue-800 hover:bg-blue-50"
            onClick={() => setViewDetails(false)}
          >
            {"< "}Back
          </button>
        </div>

        <div className="flex justify-between mb-2">
          {orderDetails?.status && (
            <div
              className={`w-[200px] ml-2 rounded-lg p-3 ${
                orderDetails.status === "Delivered"
                  ? "bg-green-500"
                  : orderDetails.status === "Shipped"
                  ? "bg-blue-500"
                  : orderDetails.status === "Cancelled"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              Status: {orderDetails.status}
            </div>
          )}
          {orderDetails?.status == "Shipped" ? (
            <button
              className="py-2 px-4 bg-green-300 hover:bg-green-500 mr-2"
              onClick={() => setShowOtpInput(true)}
            >
              Send OTP
            </button>
          ) : null}
        </div>
        {showOtpInput && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
              <h2 className="text-xl font-bold mb-4">
                Enter OTP to Confirm Delivery
              </h2>
              <div className="flex flex-col gap-2">
                <label className="font-bold">Enter OTP:</label>
                <input
                  type="text"
                  className="border px-2 py-1 rounded"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                onClick={handleOTP}
              >
                Confirm
              </button>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => setShowOtpInput(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-2 mr-2">
            <div className="bg-white text-left rounded-lg px-2 py-2 ">
              <h2 className="font-bold text-lg mb-1">Customer Details</h2>
              <p>FullName : {customerDetails?.fullName}</p>
              <p>Email : {customerDetails?.email}</p>
              <p>Phone no. : {customerDetails?.phoneNumber}</p>
            </div>
            <div className="bg-white text-left rounded-lg px-2 py-2 ">
              <h2 className="font-bold text-lg mb-1">Delivery Address</h2>
              <p>FullName : {deliveryAddress?.fullName}</p>
              <p>Email : {deliveryAddress?.email}</p>
              <p>Phone no. : {deliveryAddress?.phone}</p>
              <p>
                Address : {deliveryAddress?.address}, {deliveryAddress?.city},{" "}
                {deliveryAddress?.state} {"("}
                {deliveryAddress?.zip}
                {")"}
              </p>
            </div>
            <div className="bg-white text-left rounded-lg px-2 py-2  ml-2">
              <h2 className="font-bold text-lg mb-1">Payment Details</h2>
              <p>Amount : {paymentDetails?.amount}</p>
              <p>Payment Method : {paymentDetails?.paymentMethod}</p>
              <p>Status : {paymentDetails?.status}</p>
            </div>
          </div>
          <div className="bg-white text-left rounded-lg px-2 py-2 mx-2">
            <h2 className="font-bold text-lg mb-2">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {productDetails?.map((product) => (
                <div
                  className="ml-2 bg-gray-100 p-2 rounded-md"
                  key={product._id}
                >
                  <p>productName : {product?.productName}</p>
                  <p>category : {product?.category}</p>
                  <p>price : {product?.price}</p>
                  <p>quantity : {product?.quantity}</p>
                  <p>color : {product?.color}</p>
                  <div className="flex gap-2">
                    <label>Sizes: </label>
                    {product?.sizes?.map((size) => (
                      <p key={size._id}>
                        {"["}
                        {size.size} : {size.quantity}
                        {"]"}
                      </p>
                    ))}
                  </div>
                  {/* {product.printLocation.length != 0 && (
                    <span
                      className="mt-2 text-blue-500 hover:text-blue-800 cursor-pointer"
                      onClick={() => {
                        setProductId(product._id);
                        setViewDesign(true);
                      }}
                    >
                      view design
                    </span>
                  )} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartnerOrderDetails;
