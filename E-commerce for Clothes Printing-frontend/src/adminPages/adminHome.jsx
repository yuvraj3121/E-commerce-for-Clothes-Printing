import React, { useState, useEffect } from "react";
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
import { FaRupeeSign } from "react-icons/fa";
import { BsBoxSeam, BsGraphUp } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import AdminDashboard from "./adminDashboard";
import AdminProducts from "./adminProducts";

const AdminHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [usersData, setUsersData] = useState(null);
  const [allProduct, setAllProduct] = useState([]);

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
  }, []);

  const stats = [
    {
      title: "Total Sales",
      value: "₹12,345",
      icon: <FaRupeeSign size={24} />,
      change: "+12%",
    },
    {
      title: "Orders",
      value: "0",
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

  const recentOrders = [
    {
      id: "#12345",
      customer: "John Doe",
      date: "2023-11-15",
      status: "Shipped",
      total: "₹125.99",
    },
    {
      id: "#12346",
      customer: "Jane Smith",
      date: "2023-11-14",
      status: "Delivered",
      total: "₹89.50",
    },
    {
      id: "#12347",
      customer: "Alex Johnson",
      date: "2023-11-13",
      status: "Processing",
      total: "₹234.00",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-blue-800 text-white 
        transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-4 flex items-center justify-center border-b border-blue-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { icon: <FiHome />, label: "Dashboard", tab: "dashboard" },
              { icon: <BsBoxSeam />, label: "Orders", tab: "orders" },
              { icon: <FiShoppingBag />, label: "Products", tab: "products" },
              { icon: <FiUsers />, label: "Customers", tab: "customers" },
              { icon: <BsGraphUp />, label: "Analytics", tab: "analytics" },
              { icon: <FiSettings />, label: "Settings", tab: "settings" },
            ].map((item) => (
              <li key={item.tab}>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition ${
                    activeTab === item.tab ? "bg-blue-700" : "hover:bg-blue-700"
                  }`}
                  onClick={() => setActiveTab(item.tab)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button className="flex items-center w-full p-3 text-red-300 hover:bg-blue-700 rounded-lg transition">
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-800 font-medium">AD</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {activeTab === "dashboard" && (
            <AdminDashboard stats={stats} recentOrders={recentOrders} />
          )}

          {activeTab === "orders" && <div>Orders Management Content</div>}
          {activeTab === "products" && <AdminProducts />}
          {activeTab === "customers" && <div>Customers Management Content</div>}
          {activeTab === "analytics" && <div>Analytics Content</div>}
          {activeTab === "settings" && <div>Settings Content</div>}
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
