import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { setSelectedOrder } from "../features/ordersSlice";

const Orders = ({}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allOrders } = useSelector((state) => state.orders);
  // console.log(allOrders);

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

          {allOrders.length === 0 ? (
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
                {allOrders.map((order) => (
                  <div
                    key={order.id}
                    className="w-[700px] bg-gray-100 flex flex-row justify-between items-center  border border-gray-300 rounded p-4 mb-5"
                  >
                    <img
                      src={order.productImage[0].url}
                      alt={order.productName}
                      className="w-32 h-32 object-contain rounded"
                    />
                    <div className="flex-col ">
                      <h3 className="font-medium text-lg mb-1">
                        {order.productName}
                      </h3>
                      <p className="text-sm font-semibold">
                        Ordered on {order.orderedOn}
                      </p>
                    </div>
                    <div className="flex-row ">
                      <p
                        className="w-max cursor-pointer hover:text-blue-400 hover:bg-blue-50"
                        onClick={() => {
                          navigate("/orderDetails");
                          dispatch(setSelectedOrder(order));
                        }}
                      >
                        Order details {" >"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Orders;
