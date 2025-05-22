import axios from "axios";
import React, { useState } from "react";
import { GrUpdate } from "react-icons/gr";

const AdminProductDetails = ({ selectedProduct, setComponentSelect }) => {
  const [selectUpdate, setSelectUpdate] = useState(false);
  const [product, setProduct] = useState(selectedProduct);
  const [frontImageFile, setFrontImageFile] = useState(null);
  const [backImageFile, setBackImageFile] = useState(null);
  const [productImage, setProductImage] = useState(
    selectedProduct.productImage[0].url
  );

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (e.target.name === "frontImage" && file) {
      setFrontImageFile(file);
    } else if (e.target.name === "backImage" && file) {
      setBackImageFile(file);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const colorsArray =
      typeof product.colors === "string"
        ? product.colors
            .toLowerCase()
            .split(",")
            .map((item) => item.trim())
        : product.colors.map((color) => color.toLowerCase());

    const sizesArray =
      typeof product.sizes === "string"
        ? product.sizes
            .toUpperCase()
            .split(",")
            .map((item) => item.trim())
        : product.sizes.map((size) => size.toUpperCase());

    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("sizes", JSON.stringify(sizesArray));
    formData.append("colors", JSON.stringify(colorsArray));

    if (frontImageFile) formData.append("frontImage", frontImageFile);
    if (backImageFile) formData.append("backImage", backImageFile);

    try {
      await axios
        .patch(
          `http://localhost:8000/api/product/updateProduct/${selectedProduct._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
          alert("Product Updated.");
          setComponentSelect("main");
        });
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className=" bg-white p-6 rounded-xl shadow">
      {selectUpdate == false ? (
        <div>
          <div className="mb-6 flex flex-row justify-between items-center w-full  px-4 py-2">
            <h1 className="text-3xl font-bold">Product Details</h1>
            <button
              className="text-lg cursor-pointer text-blue-400 hover:text-blue-800 hover:bg-blue-50"
              onClick={() => setComponentSelect("main")}
            >
              {"< "}Back
            </button>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <img
                className="h-[500px] w-[400px] mb-2 object-contain"
                src={productImage}
                alt=""
              />
              <div className="ml-2 flex flex-row gap-2">
                <span>
                  <img
                    className="h-[70px] w-[50px] cursor-pointer object-contain"
                    src={selectedProduct.productImage[0].url}
                    alt=""
                    onClick={() =>
                      setProductImage(selectedProduct.productImage[0].url)
                    }
                  />
                </span>
                <span>
                  <img
                    className="h-[70px] w-[50px] cursor-pointer object-contain"
                    src={selectedProduct.productImage[1].url}
                    alt=""
                    onClick={() =>
                      setProductImage(selectedProduct.productImage[1].url)
                    }
                  />
                </span>
              </div>
            </div>
            <div className="ml-2 bg-gray-200 w-[64%] p-5  text-left">
              <h2 className="font-medium text-2xl mb-2">
                {" "}
                Name : {selectedProduct.productName}
              </h2>
              <p className="text-lg mb-2">
                Category : {selectedProduct.category}
              </p>
              <p className="text-lg mb-2">Price : {selectedProduct.price}</p>
              <div className="flex flex-row gap-1 mb-2">
                <label htmlFor="" className="text-lg">
                  Colors :{" "}
                </label>
                <div className="flex flex-col mb-2">
                  {selectedProduct.colors.map((color) => (
                    <p className="text-lg" key={color}>
                      {color}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex flex-row gap-1 mb-2">
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
              <button
                className=" text-blue-400 hover:bg-blue-200 p-2 flex justify-center items-center gap-1 mt-4"
                onClick={() => setSelectUpdate(true)}
              >
                <GrUpdate /> Update
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col ">
          <div className="mb-6 flex flex-row justify-between items-center w-full  px-4 py-2">
            <h1 className="text-3xl font-bold">Update Product</h1>
            <button
              className="text-lg cursor-pointer text-blue-400 hover:text-blue-800 hover:bg-blue-50"
              onClick={() => setComponentSelect("main")}
            >
              {"< "}Back
            </button>
          </div>

          <div className=" p-4 rounded w-[600px] text-left">
            <div className="grid grid-cols-[120px_1fr] gap-4 items-center text-left">
              <label className="text-lg text-left">Name :</label>
              <input
                name="productName"
                value={product.productName}
                onChange={handleChange}
                type="text"
                className="border px-2 py-1 rounded w-full text-sm"
              />

              <label className="text-lg text-left">Category :</label>
              <input
                name="category"
                value={product.category}
                onChange={handleChange}
                type="text"
                className="border px-2 py-1 rounded w-full text-sm"
              />

              <label className="text-lg text-left">Price :</label>
              <input
                name="price"
                value={product.price}
                onChange={handleChange}
                type="text"
                className="border px-2 py-1 rounded w-full text-sm"
              />

              <label className="text-lg text-left">Sizes :</label>
              <input
                name="sizes"
                value={product.sizes}
                onChange={handleChange}
                type="text"
                className="border px-2 py-1 rounded w-full text-sm"
              />

              <label className="text-lg text-left">Colors :</label>
              <input
                name="colors"
                value={product.colors}
                onChange={handleChange}
                type="text"
                className="border px-2 py-1 rounded w-full text-sm"
              />

              <label className="text-lg text-left">Front Image :</label>
              <input
                name="frontImage"
                type="file"
                className="border px-2 py-1 rounded w-full text-sm"
                onChange={handleImageUpload}
              />

              <label className="text-lg text-left">Back Image :</label>
              <input
                name="backImage"
                type="file"
                className="border px-2 py-1 rounded w-full text-sm"
                onChange={handleImageUpload}
              />
              <div className="flex flex-row gap-2">
                <button
                  className="bg-blue-500 mt-2 p-2 w-[80px]"
                  onClick={handleClick}
                >
                  Update
                </button>
                <button
                  className="bg-blue-500 mt-2 p-2 w-[80px]"
                  onClick={() => setSelectUpdate(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductDetails;
