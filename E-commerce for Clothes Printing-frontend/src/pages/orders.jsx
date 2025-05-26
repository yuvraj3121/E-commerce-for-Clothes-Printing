import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { setSelectedOrder } from "../features/ordersSlice";
import axios from "axios";

const Orders = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedOrder } = useSelector((state) => state.orders);
  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get(
            "https://designdrip-v1.onrender.com/api/user/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(res.data.user);
          await axios
            .get(
              `https://designdrip-v1.onrender.com/api/order/userOrder/${res.data.user._id}`
            )
            .then((res) => {
              const orders = res.data.orders.map((order) => ({
                orderedOn: order.createdAt,
                ...order,
              }));
              setUserOrders(orders);
            });
        }
      } catch (err) {
        localStorage.removeItem("token");
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      <button
        className="absolute top-2 left-5 border border-black px-4 py-2 rounded cursor-pointer bg-white hover:bg-gray-100"
        onClick={() => navigate("/")}
      >
        Home
      </button>
      {!user ? (
        <div className="flex items-center justify-center h-screen">
          <h1>
            Please{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </h1>
        </div>
      ) : (
        <div className="max-w-[1200px] mx-auto p-5">
          <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

          {userOrders?.length === 0 ? (
            <div className="text-center py-10">
              <p className="mb-4">No orders found.</p>
              <button
                className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-red-500"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              <div className="flex-col">
                {userOrders?.map((order) =>
                  order.product.map((item) => (
                    <div key={item._id} className="w-[700px] ">
                      <div
                        className={`text-left rounded-t-lg px-2 ${
                          order.status == "Delivered"
                            ? "bg-green-400"
                            : order.status == "Shipped"
                            ? "bg-blue-400"
                            : order.status == "Cancelled"
                            ? "bg-red-400"
                            : "bg-yellow-400"
                        }`}
                      >
                        {order.status}
                      </div>
                      <div className="bg-gray-100 flex flex-row justify-between items-center border border-gray-300 rounded-b-lg p-4 mb-5">
                        <img
                          src={item.productImage[0]?.url}
                          alt={item.productName}
                          className="w-32 h-32 object-contain rounded"
                        />
                        <div className="flex-col">
                          <h3 className="font-medium text-lg mb-1">
                            {item.productName}
                          </h3>
                          <p className="text-sm font-semibold">
                            Ordered on{" "}
                            {new Date(order.orderedOn).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="flex-row">
                          <p
                            className="w-max cursor-pointer hover:text-blue-400 hover:bg-blue-50"
                            onClick={() => {
                              navigate("/orderDetails");
                              dispatch(
                                setSelectedOrder({
                                  orderId: order._id,
                                  status: order.status,
                                  orderedOn: order.orderedOn,
                                  userDetails: order.deliveryAddress,
                                  ...item,
                                })
                              );
                            }}
                          >
                            Order details {" >"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Orders;
