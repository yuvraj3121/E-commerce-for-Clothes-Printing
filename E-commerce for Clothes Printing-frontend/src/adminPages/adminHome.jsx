import React, { useState, useEffect, useContext } from "react";
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { BsBoxSeam, BsGraphUp } from "react-icons/bs";
import AdminDashboard from "./adminDashboard";
import AdminProducts from "./adminProducts";
import AdminOrders from "./adminOrders";
import { AuthContext } from "../context/AuthContext";
import AdminCustomers from "./adminCustomers";

const AdminHome = () => {
  const { user, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

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
          <button
            className="flex items-center w-full p-3 text-red-300 hover:bg-blue-700 rounded-lg transition"
            onClick={() => logout()}
          >
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
          {activeTab === "dashboard" && <AdminDashboard />}

          {activeTab === "orders" && <AdminOrders />}
          {activeTab === "products" && <AdminProducts />}
          {activeTab === "customers" && <AdminCustomers />}
          {activeTab === "analytics" && <div>Analytics Content</div>}
          {activeTab === "settings" && <div>Settings Content</div>}
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
