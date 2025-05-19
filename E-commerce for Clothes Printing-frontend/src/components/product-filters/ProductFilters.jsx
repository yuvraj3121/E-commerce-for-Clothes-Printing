import React from "react";

const ProductFilters = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xs">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Filter By</h3>

        <div className="mb-6">
          <h4 className="text-md font-medium mb-2 text-gray-700">Price</h4>
          <input
            type="range"
            min="0"
            max="2000"
            step="100"
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>₹0</span>
            <span>₹2000</span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-medium mb-2 text-gray-700">Color</h4>
          <div className="flex flex-wrap gap-2">
            {[
              "white",
              "black",
              "blue",
              "red",
              "navy",
              "gray",
              "green",
              "yellow",
            ].map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded-full border border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium mb-2 text-gray-700">Size</h4>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
