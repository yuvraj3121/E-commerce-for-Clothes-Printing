import React, { useState } from "react";
import { addToAllProduct } from "../features/productSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const AdminAddProduct = ({ mockProducts, setComponentSelect }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: 0,
    colors: "",
    sizes: "",
  });
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [frontImageFile, setFrontImageFile] = useState(null);
  const [backImageFile, setBackImageFile] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (e.target.name === "frontImage" && file) {
      setFrontImageFile(file);
      setFrontImage(URL.createObjectURL(file));
    } else if (e.target.name === "backImage" && file) {
      setBackImageFile(file);
      setBackImage(URL.createObjectURL(file));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const colorsArray = product.colors.toLowerCase().split(", ");
    const sizesArray = product.sizes.toUpperCase().split(", ");
    // dispatch(
    //   addToAllProduct({
    //     id: Date.now(),
    //     name: product.name,
    //     category: product.category,
    //     price: product.price,
    //     sizes: sizesArray,
    //     colors: colorsArray,
    //     image: [
    //       { side: "Front", url: frontImage },
    //       { side: "Back", url: backImage },
    //     ],
    //   })
    // );
    // alert("Product Added.");
    // setComponentSelect("main");
    const formData = new FormData();
    formData.append("productName", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("sizes", sizesArray);
    formData.append("colors", colorsArray);
    formData.append("frontImage", frontImageFile);
    formData.append("backImage", backImageFile);

    try {
      await axios
        .post("http://localhost:8000/api/product/createProduct", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          alert("Product Added.");
          setComponentSelect("main");
        });
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="mb-4 flex flex-col justify-between items-center bg-white p-6 rounded-xl shadow">
      <div className="mb-6 flex flex-row justify-between items-center w-full  px-4 py-2">
        <h1 className="text-3xl font-bold">Add Product</h1>
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
            name="name"
            value={product.name}
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
          <button
            className="bg-blue-500 mt-2 p-2 w-[80px]"
            onClick={handleClick}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
