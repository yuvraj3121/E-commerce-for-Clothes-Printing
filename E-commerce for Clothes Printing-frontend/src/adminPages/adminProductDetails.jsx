import React, { useState } from "react";

const AdminProductDetails = ({ selectedProduct, setComponentSelect }) => {
  const [productImage, setProductImage] = useState(
    selectedProduct.productImage[0].url
  );

  return (
    <div className="flex flex-row bg-white p-6 rounded-xl shadow">
      <button
        className=" flex justify-center items-center absolute top-35 right-20 cursor-pointer hover:text-blue-600 hover:bg-blue-50 text-lg "
        onClick={() => setComponentSelect("main")}
      >
        {"< "}Back
      </button>

      <div>
        <img className="h-[500px] w-[400px] mb-2" src={productImage} alt="" />
        <div className="ml-2 flex flex-row gap-2">
          <span>
            <img
              className="h-[70px] w-[50px] cursor-pointer"
              src={selectedProduct.productImage[0].url}
              alt=""
              onClick={() =>
                setProductImage(selectedProduct.productImage[0].url)
              }
            />
          </span>
          <span>
            <img
              className="h-[70px] w-[50px] cursor-pointer"
              src={selectedProduct.productImage[1].url}
              alt=""
              onClick={() =>
                setProductImage(selectedProduct.productImage[1].url)
              }
            />
          </span>
        </div>
      </div>
      <div className="ml-2 bg-gray-200 w-[64%] p-5 flex flex-col gap-2 text-left">
        <h2 className="font-medium text-2xl">
          {" "}
          Name : {selectedProduct.productName}
        </h2>
        <p className="text-lg">Category : {selectedProduct.category}</p>
        <p className="text-lg">Price : {selectedProduct.price}</p>
        <div className="flex flex-row gap-1">
          <label htmlFor="" className="text-lg">
            Colors :{" "}
          </label>
          <div className="flex flex-col">
            {selectedProduct.colors.map((color) => (
              <p className="text-lg" key={color}>
                {color}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-1">
          <label htmlFor="" className="text-lg">
            Sizes :{" "}
          </label>
          <div className="flex flex-col">
            {selectedProduct.sizes.map((size) => (
              <p className="text-lg" key={size}>
                {size}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetails;
