import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const { selectedOrder } = useSelector((state) => state.orders);
  console.log(selectedOrder);
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/orders")}
        className="text-blue-500 mb-6 hover:bg-blue-100"
      >
        &larr; Back
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <img
            src={selectedOrder.productImage[0].url}
            alt={selectedOrder.productImage[0].side}
            className="w-full rounded-md"
          />
        </div>

        <div className="md:w-1/2 p-5 bg-gray-100">
          <h2 className="text-2xl font-semibold mb-2">
            {selectedOrder.productName}
          </h2>

          <div className="mb-5 ">
            <p className="font-medium">Sizes:</p>
            <ul className="text-sm text-gray-700">
              {selectedOrder.sizes.map((size) => (
                <li key={size.size} className="">
                  {size.size} : {size.quantity}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-500 text-left p-4 mb-4">
            <p>
              Delivered on{" "}
              {(() => {
                const date = new Date(selectedOrder.orderedOn);
                date.setDate(date.getDate() + 10);
                return date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
              })()}
            </p>
          </div>

          <div className="mb-4 bg-gray-100 text-left p-5">
            <h2 className="font-semibold mb-2">Delivery Address</h2>
            <p className="font-semibold">
              {selectedOrder.userDetails.fullName}
            </p>
            <p>{selectedOrder.userDetails.phone}</p>
            <p>
              {selectedOrder.userDetails.address},{" "}
              {selectedOrder.userDetails.city},{" "}
              {selectedOrder.userDetails.state} -{" "}
              {selectedOrder.userDetails.zip}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-green-600">
              Total Price: ₹{selectedOrder.price}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
