import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiPieChart,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

const AdminDashboard = () => {
  const [usersData, setUsersData] = useState(null);
  const [allProduct, setAllProduct] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get("http://localhost:8000/api/user/allUsers")
        .then((res) => setUsersData(res.data))
        .catch((err) => console.log(err));
    };
    getUsers();

    const fetchAllProduct = async () => {
      try {
        await axios
          .get("http://localhost:8000/api/product/allProduct")
          .then((res) => {
            setAllProduct(res.data);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProduct();

    const fetchAllOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/order/allOrder");
        const orders = res.data.orders;
        setAllOrders({ orders });

        const amount = orders.reduce((acc, order) => {
          const orderTotal = order.product.reduce((sum, item) => {
            return sum + item.price * item.quantity;
          }, 0);
          return acc + orderTotal;
        }, 0);

        setTotalAmount(amount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllOrders();
    // console.log("all", allOrders.orders);
  }, []);

  const stats = [
    {
      title: "Total Sales",
      value: `₹${totalAmount}`,
      icon: <FaRupeeSign size={24} />,
      change: "+12%",
    },
    {
      title: "Orders",
      value: allOrders?.orders?.length || 0,
      icon: <AiOutlineShoppingCart size={24} />,
      change: "+5%",
    },
    {
      title: "Products",
      value: allProduct?.count || 0,
      icon: <FiShoppingBag size={24} />,
      change: "+3%",
    },
    {
      title: "Customers",
      value: usersData?.count || 0,
      icon: <FiUsers size={24} />,
      change: "+8%",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-evenly items-start">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          {/* <button
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            onClick={() => {}}
          >
            View All
          </button> */}
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
                <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allOrders?.orders?.slice(0, 5).map((order) => (
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
                    ₹
                    {order.product.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
