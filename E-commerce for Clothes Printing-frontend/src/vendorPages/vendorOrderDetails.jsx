import axios from "axios";
import React, { useEffect, useState } from "react";
import VendorProductDesign from "./vendorProductDesign";

const VendorOrderdetails = ({ orderId, setViewDetails }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [orderStatus, setOrderStatus] = useState("Under Process");
  const [viewDesign, setViewDesign] = useState(false);
  const [productId, setProductId] = useState(null);

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
  }, [orderId, orderStatus]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setOrderStatus(newStatus);

    try {
      const res = await axios.patch(
        `https://designdrip-v1.onrender.com/api/order/updateStatus/${orderId}`,
        {
          status: newStatus,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // console.log(productDetails);

  return (
    <div className={`flex flex-col h-screen bg-gray-100`}>
      {!viewDesign ? (
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
            <select
              name="orderStatus"
              className="border px-2 py-1 rounded w-[200px] mr-2"
              onChange={handleStatusChange}
              value={orderStatus}
            >
              <option value="Under Process">Under Process</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
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
                <p>Address : {deliveryAddress?.address}</p>
                <p>City : {deliveryAddress?.city}</p>
                <p>State : {deliveryAddress?.state}</p>
                <p>Zip : {deliveryAddress?.zip}</p>
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
                    {product.printLocation.length != 0 && (
                      <span
                        className="mt-2 text-blue-500 hover:text-blue-800 cursor-pointer"
                        onClick={() => {
                          setProductId(product._id);
                          setViewDesign(true);
                        }}
                      >
                        view design
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <VendorProductDesign
          setViewDesign={setViewDesign}
          productId={productId}
        />
      )}
    </div>
  );
};

export default VendorOrderdetails;
