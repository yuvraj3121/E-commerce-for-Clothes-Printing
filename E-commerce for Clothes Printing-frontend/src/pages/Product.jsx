import React, { useContext, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { incrementCartCount, addToCart } from "../features/cartSlice.js";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbPhotoEdit } from "react-icons/tb";
import Header from "../components/header/Header.jsx";
import axios from "axios";

const Product = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);
  const { selectedProduct } = useSelector((state) => state.product);
  const [sizes, setSize] = useState([
    { size: "S", quantity: 0 },
    { size: "M", quantity: 0 },
    { size: "L", quantity: 0 },
    { size: "XL", quantity: 0 },
  ]);
  const [color, setColor] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [frontDesignPreview, setFrontDesignPreview] = useState(null);
  const [backDesignPreview, setBackDesignPreview] = useState(null);
  const [isFrontChecked, setIsFrontChecked] = useState(false);
  const [isBackChecked, setIsBackChecked] = useState(false);
  const [frontDesignFile, setFrontDesignFile] = useState(null);
  const [backDesignFile, setBackDesignFile] = useState(null);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let productData = {
    id: Date.now(),
    productName: selectedProduct.productName,
    category: selectedProduct.category,
    productImage: selectedProduct.productImage,
    frontDesign: { url: frontDesignPreview, text: "" },
    backDesign: { url: backDesignPreview, text: "" },
    printLocation: [
      ...(isFrontChecked ? ["front"] : []),
      ...(isBackChecked ? ["back"] : []),
    ],
    sizes: sizes,
    color: color,
    quantity: totalQuantity,
  };

  const handleImgChangeClick = () => {
    setNext(!next);
    setPrev(!prev);
  };

  const handleFrontCheckboxChange = () => {
    setIsFrontChecked(!isFrontChecked);
  };

  const handleBackCheckboxChange = () => {
    setIsBackChecked(!isBackChecked);
  };

  const handleFrontDesignUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrontDesignFile(file);
      setFrontDesignPreview(URL.createObjectURL(file));
    }
  };

  const handleBackDesignUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackDesignFile(file);
      setBackDesignPreview(URL.createObjectURL(file));
    }
  };

  const handleSizeChange = (index, value) => {
    const newSizes = [...sizes];
    newSizes[index].quantity = value;
    setSize(newSizes);
  };

  const handleAddToCart = async () => {
    if (!color) return alert("Please select color");
    if (totalQuantity < 1) return alert("Quantity must be greater than 0");
    if (sizes.some((item) => item.quantity < 0))
      return alert("Size quantity must be >= 0");

    let sizesSUM = sizes.reduce((acc, item) => acc + item.quantity, 0);
    if (sizesSUM !== totalQuantity)
      return alert("Size quantity must equal total quantity");

    if (isFrontChecked && !frontDesignPreview)
      return alert("Please upload front design");
    if (isBackChecked && !backDesignPreview)
      return alert("Please upload back design");

    dispatch(incrementCartCount());
    dispatch(
      addToCart({
        ...productData,
        price: selectedProduct.price * totalQuantity,
      })
    );

    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("category", productData.category);
    formData.append("price", selectedProduct.price * totalQuantity);
    formData.append("frontDesignText", productData.frontDesign.text);
    formData.append("backDesignText", productData.backDesign.text);
    formData.append("color", productData.color);
    formData.append("quantity", productData.quantity);
    formData.append("printLocation", JSON.stringify(productData.printLocation));
    formData.append("sizes", JSON.stringify(productData.sizes));
    formData.append("productImage", JSON.stringify(productData.productImage));
    if (frontDesignFile) {
      formData.append("frontDesignImage", frontDesignFile);
    }
    if (backDesignFile) {
      formData.append("backDesignImage", backDesignFile);
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/userProduct/createUserProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      const createdProduct = res.data.product;

      await axios.post("http://localhost:8000/api/cart/addToCart", {
        userId: user._id,
        productId: createdProduct._id,
      });

      alert("Added to cart!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error adding to cart or creating product.");
    }
  };

  return (
    <>
      <Header />

      <div className=" max-w-7xl mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-2xl font-sans">
        <div className="flex flex-col md:flex-row gap-8 bg-gray-100 rounded-lg p-6">
          <div
            className="md:w-2/3 flex justify-center relative"
            style={{ height: "500px" }}
          >
            <div className="h-full w-16 flex items-center justify-center absolute left-0 top-0 text-4xl text-gray-400 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <IoIosArrowBack onClick={() => handleImgChangeClick("prev")} />
            </div>

            <img
              src={
                prev
                  ? selectedProduct.productImage[0].url
                  : selectedProduct.productImage[1].url
              }
              alt={selectedProduct.productName}
              className="w-full h-full object-contain rounded-lg border border-gray-300"
            />

            <div className="h-full w-16 flex items-center justify-center absolute right-0 top-0 text-4xl text-gray-400 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <IoIosArrowForward onClick={() => handleImgChangeClick("next")} />
            </div>
          </div>

          <div className="md:w-1/3 space-y-6">
            <h2 className="text-3xl font-semibold text-center text-gray-800">
              {selectedProduct.productName}
            </h2>

            <div className="text-xl font-semibold text-gray-700">
              <h3>Price: ₹{selectedProduct.price}</h3>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Color:
              </label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Quantity:
              </label>
              <input
                type="number"
                min="1"
                value={totalQuantity}
                onChange={(e) => setTotalQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-3 font-semibold text-gray-700">
                Print Location:
              </label>
              <div className="flex gap-4">
                <div className="flex-1 bg-white p-4 rounded-md border border-gray-300">
                  <label className="flex items-center gap-2 mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFrontChecked}
                      onChange={handleFrontCheckboxChange}
                      className="w-5 h-5"
                    />
                    Front
                  </label>
                  {isFrontChecked && (
                    <>
                      <label className="block mb-2 font-semibold">
                        Upload Design:
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFrontDesignUpload}
                        className="w-full"
                      />
                      {frontDesignPreview && (
                        <div className="mt-3">
                          <h4 className="font-semibold mb-2 text-gray-700">
                            Preview:
                          </h4>
                          <img
                            src={frontDesignPreview}
                            alt="Front Design Preview"
                            className="w-full max-h-48 object-contain rounded-md border border-gray-300"
                          />
                          <button
                            onClick={() => setFrontDesignPreview(null)}
                            className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
                          >
                            Remove Design
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="flex-1 bg-white p-4 rounded-md border border-gray-300">
                  <label className="flex items-center gap-2 mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isBackChecked}
                      onChange={handleBackCheckboxChange}
                      className="w-5 h-5"
                    />
                    Back
                  </label>
                  {isBackChecked && (
                    <>
                      <label className="block mb-2 font-semibold">
                        Upload Design:
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackDesignUpload}
                        className="w-full"
                      />
                      {backDesignPreview && (
                        <div className="mt-3">
                          <h4 className="font-semibold mb-2 text-gray-700">
                            Preview:
                          </h4>
                          <img
                            src={backDesignPreview}
                            alt="Back Design Preview"
                            className="w-full max-h-48 object-contain rounded-md border border-gray-300"
                          />
                          <button
                            onClick={() => setBackDesignPreview(null)}
                            className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
                          >
                            Remove Design
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Size Quantities:
              </label>
              <div className="grid grid-cols-4 gap-4">
                {sizes.map((item, index) => (
                  <div key={item.size} className="flex flex-col items-center">
                    <label className="mb-1 font-medium">{item.size}</label>
                    <input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) =>
                        handleSizeChange(index, Number(e.target.value))
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate("/customization")}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
            >
              <TbPhotoEdit className="text-xl" />
              Create your design
            </button>

            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
