import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminOrderdetails = ({ orderId, setViewDetails }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [showVendors, setShowVendors] = useState(false);
  const [allVendors, setAllVendors] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/order/orderDetails/${orderId}`
        );
        setOrderDetails(res.data.order || {});
        setCustomerDetails(res.data.order.customer || {});
        setProductDetails(res.data.order.product || {});
        setDeliveryAddress(res.data.order.deliveryAddress || {});
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
    console.log(orderDetails);
  }, [orderId]);

  const handleFindVendor = async () => {
    setShowVendors(true);
    try {
      const res = await axios.get(
        "http://localhost:8000/api/vendor/AllVendors"
      );
      setAllVendors(
        res.data.vendors.filter(
          (vendor) =>
            vendor.status === "accepted" &&
            (vendor.address.city === deliveryAddress.city ||
              vendor.address.state === deliveryAddress.state)
        )
      );
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const handleAssignVendor = async (orderId, vendorId) => {
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/vendor/assignOrder",
        { orderId, vendorId }
      );
      // console.log(res.data);
      setShowVendors(false);
    } catch (error) {
      console.log("Error Assigning", error);
    }
  };

  return (
    <div
      className={`flex flex-col h-screen bg-gray-100 ${
        showVendors ? "backdrop-blur-sm" : ""
      }`}
    >
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
                : "bg-yellow-500"
            }`}
          >
            Status: {orderDetails.status}
          </div>
        )}
        {orderDetails?.status == "Pending" ? (
          <button
            className="cursor-pointer mr-2 text-blue-400 hover:text-blue-700 p-2 hover:bg-blue-100 rounded-lg"
            onClick={handleFindVendor}
          >
            Assign Vendor
          </button>
        ) : null}
      </div>
      {showVendors && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[900px]">
            <h2 className="text-xl font-bold mb-4">Assign Vendor</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor ID
                    </th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business Name
                    </th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allVendors?.map((vendor) => (
                    <tr key={vendor._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {vendor._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vendor.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {vendor.businessName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {vendor.address.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {vendor.address.state}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <button
                          className="text-white hover:bg-blue-800 bg-blue-500 px-2 py-1"
                          onClick={() =>
                            handleAssignVendor(orderId, vendor._id)
                          }
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setShowVendors(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2">
          <div className="bg-white text-left rounded-lg px-2 py-2 w-[49%] ml-2">
            <h2 className="font-bold text-lg mb-1">Customer Details</h2>
            <p>FullName : {customerDetails?.fullName}</p>
            <p>Email : {customerDetails?.email}</p>
            <p>Phone no. : {customerDetails?.phoneNumber}</p>
          </div>
          <div className="bg-white text-left rounded-lg px-2 py-2 w-[49%]">
            <h2 className="font-bold text-lg mb-1">Delivery Address</h2>
            <p>FullName : {deliveryAddress?.fullName}</p>
            <p>Email : {deliveryAddress?.email}</p>
            <p>Phone no. : {deliveryAddress?.phone}</p>
            <p>Address : {deliveryAddress?.address}</p>
            <p>City : {deliveryAddress?.city}</p>
            <p>State : {deliveryAddress?.state}</p>
            <p>Zip : {deliveryAddress?.zip}</p>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderdetails;
