import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminOrderdetails = ({ orderId, setViewDetails }) => {
  // console.log(orderId);
  const [orderDetails, setOrderDetails] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [deliveryAddress, setdeliveryAddress] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        await axios
          .get(`http://localhost:8000/api/order/orderDetails/${orderId}`)
          .then((res) => {
            setOrderDetails(res.data.order || {});
            setCustomerDetails(res.data.order.customer || {});
            setProductDetails(res.data.order.product[0] || {});
            setdeliveryAddress(res.data.order.deliveryAddress || {});
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
  }, []);

  // console.log(orderDetails);
  // console.log(customerDetails);
  // console.log(deliveryAddress);
  // console.log(productDetails);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="mb-6 flex flex-row justify-between items-center w-full  px-4 py-2">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <button
          className="text-lg cursor-pointer text-blue-400 hover:text-blue-800 hover:bg-blue-50"
          onClick={() => setViewDetails(false)}
        >
          {"< "}Back
        </button>
      </div>
      <div className="flex gap-4">
        <div className="w-[58%] bg-white text-left rounded-lg px-2 py-2 ml-2 flex flex-col items-center gap-2 ">
          <div className="flex gap-2">
            <img
              className="h-[300px] w-[240px]"
              src={productDetails?.productImage?.[0].url}
              alt="frontImage"
            />
            <img
              className="h-[300px] w-[240px]"
              src={productDetails?.productImage?.[1].url}
              alt="backImage"
            />
          </div>
          {/* <div className="flex flex-row gap-2">
            {productDetails.printLocation.includes("front") && (
              <div className="bg-blue-300 h-[335px] w-[240px] flex flex-col items-center gap-1">
                <h3 className="text-lg font-bold">Front Design</h3>
                <div className="flex gap-2">
                  {productDetails.frontDesignImage && (
                    <div className="h-[80px] w-[80px] object-contain mb-8">
                      <img src={productDetails.frontDesignImage} alt="" />
                    </div>
                  )}
                  {!productDetails.frontDesignText && (
                    <div>
                      <p>{productDetails.frontDesignText} front text</p>
                    </div>
                  )}
                </div>
                {productDetails.frontDesignImage && (
                  <div className="h-[120px] w-[120px] object-contain ">
                    <img src={productDetails.frontDesignImage} alt="" />
                  </div>
                )}
              </div>
            )}
            {productDetails.printLocation.includes("front") && (
              <div className="bg-blue-300 h-[300px] w-[240px] flex">
                <h3 className="text-lg font-bold">Front Design</h3>
                {productDetails.frontDesignImage && (
                  <div className="h-[100px] w-[100px] object-contain bg-red-300 mb-4">
                    <img src={productDetails.frontDesignImage} alt="" />
                  </div>
                )}
                {productDetails.frontDesignText && (
                  <div>
                    <p>{productDetails.frontDesignText}</p>
                  </div>
                )}
                {productDetails.frontDesignImage && (
                  <div className="h-[100px] w-[100px] object-contain bg-red-300">
                    <img src={productDetails.frontDesignImage} alt="" />
                  </div>
                )}
              </div>
            )}
          </div> */}
        </div>
        <div className="flex flex-col gap-2 w-[39%]">
          {orderDetails?.status && (
            <div
              className={`p-3 ${
                orderDetails.status === "Delivered"
                  ? "bg-green-500"
                  : orderDetails.status === "Shipped"
                  ? "bg-blue-500"
                  : "bg-yellow-500"
              }`}
            >
              Status: {orderDetails.status}
            </div>
          )}

          <div className="bg-white text-left rounded-lg px-2 py-2">
            <h2 className="font-bold text-lg" mb-1>
              Customer Details
            </h2>
            <p>FullName : {customerDetails?.fullName}</p>
            <p>Email : {customerDetails?.email}</p>
            <p>Phone no. : {customerDetails?.phoneNumber}</p>
          </div>
          <div className="bg-white text-left rounded-lg px-2 py-2">
            <h2 className="font-bold text-lg mb-1">Delivery Address</h2>
            <p>FullName : {deliveryAddress?.fullName}</p>
            <p>Email : {deliveryAddress?.email}</p>
            <p>Phone no. : {deliveryAddress?.phone}</p>
            <p>Address : {deliveryAddress?.address}</p>
            <p>City : {deliveryAddress?.city}</p>
            <p>State : {deliveryAddress?.state}</p>
            <p>Zip : {deliveryAddress?.zip}</p>
          </div>
          <div className="bg-white text-left rounded-lg px-2 py-2">
            <h2 className="font-bold text-lg mb-1">Product Details</h2>
            <p>productName : {productDetails?.productName}</p>
            <p>category : {productDetails?.category}</p>
            <p>price : {productDetails?.price}</p>
            <p>quantity : {productDetails?.quantity}</p>
            <p>color : {productDetails?.color}</p>
            <div className="flex gap-2">
              <label>Sizes: </label>
              {productDetails?.sizes?.map((size) => (
                <p key={size._id}>
                  {"["}
                  {size.size} : {size.quantity}
                  {"]"}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderdetails;
