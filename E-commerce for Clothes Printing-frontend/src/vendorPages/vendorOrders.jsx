import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import VendorOrderdetails from "./vendorOrderDetails";

const VendorOrders = () => {
  const [allOrders, setAllOrders] = useState(null);
  const [viewDetails, setViewDetails] = useState(false);
  const [orderId, setOrderId] = useState(null);
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/order/allOrder");
        setAllOrders(
          res.data.orders.filter((order) => order.status !== "Pending")
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllOrders();
  }, [viewDetails]);
  //   console.log(allOrders);
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {viewDetails == false ? (
        <div>
          <div className="flex justify-evenly items-start bg-white p-6 rounded-xl shadow w-[300px] mb-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <FiShoppingBag size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Orderss</p>
              <p className="text-2xl font-bold mt-1">{allOrders?.length}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">All Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allOrders?.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {order._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <button
                        className="text-blue-500 hover:bg-blue-100"
                        onClick={() => {
                          setOrderId(order._id);
                          setViewDetails(true);
                        }}
                      >
                        view details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <VendorOrderdetails
            orderId={orderId}
            setViewDetails={setViewDetails}
          />
        </div>
      )}
    </div>
  );
};

export default VendorOrders;
