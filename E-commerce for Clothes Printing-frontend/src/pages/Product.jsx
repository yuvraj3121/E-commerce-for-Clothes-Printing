import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { incrementCartCount, addToCart } from "../features/cartSlice.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./product.css";
import axios from "axios";

const Product = () => {
  const { selectedProduct } = useSelector((state) => state.product);
  // console.log(selectedProduct);

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
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let productData = {
    id: Date.now(),
    productName: selectedProduct.name,
    category: selectedProduct.category,
    productImage: selectedProduct.image,
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
    if (next) {
      setNext(false);
      setPrev(true);
    } else {
      setNext(true);
      setPrev(false);
    }
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
      setFrontDesignPreview(URL.createObjectURL(file));
    }
  };

  const handleBackDesignUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackDesignPreview(URL.createObjectURL(file));
    }
  };

  const handleSizeChange = (index, value) => {
    const newSizes = [...sizes];
    newSizes[index].quantity = value;
    setSize(newSizes);
  };

  const handleAddToCart = async () => {
    if (!color) {
      alert("Please select color");
      return;
    }

    if (totalQuantity < 1) {
      alert("Quantity must be greater than 0");
      return;
    }

    dispatch(incrementCartCount());

    if (sizes.every((item) => item.quantity < 0)) {
      alert("Size quantity must be greater than 0");
      return;
    }

    let sizesSUM = 0;

    sizes.forEach((item) => {
      sizesSUM += item.quantity;
    });

    if (sizesSUM != totalQuantity) {
      alert("Size quantity must be equal to the total quantity");
      return;
    }

    if (isFrontChecked && !frontDesignPreview) {
      alert("Please upload front design");
      return;
    }
    if (isBackChecked && !backDesignPreview) {
      alert("Please upload back design");
      return;
    }

    const formData = new FormData();
    formData.append("productName", selectedProduct.name);
    formData.append("category", selectedProduct.category);
    formData.append("price", selectedProduct.price * totalQuantity);
    formData.append("color", color);
    formData.append("quantity", totalQuantity);
    formData.append("printLocation", JSON.stringify(productData.printLocation));
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("productImage", selectedProduct.image);
    if (frontDesignPreview) {
      formData.append("frontDesign", frontDesignPreview);
    }
    if (backDesignPreview) {
      formData.append("backDesign", backDesignPreview);
    }

    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });

    // await axios
    //   .post("http://localhost:8000/api/product/createProduct", formData, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log("Product added to cart:", productData);
    //     dispatch(addToCart(productData));
    //     alert("Added to cart!");
    //     navigate("/");
    //   })
    //   .catch((err) => console.log("error sending", err));

    dispatch(
      addToCart({
        ...productData,
        price: selectedProduct.price * totalQuantity,
      })
    );
    alert("Added to cart!");
    navigate("/");
  };

  return (
    <>
      <button
        className="homeBtn"
        style={{
          margin: "20px",
          position: "absolute",
          left: "20px",
          border: "1px solid black",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "5px",
        }}
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <div className="product-container">
        <h2>{selectedProduct.name}</h2>

        <div className="mainDiv">
          <div className="leftDiv">
            <div
              className="arrow"
              style={{ fontSize: "30px" }}
              onClick={handleImgChangeClick}
            >
              <IoIosArrowBack />
            </div>
            {prev && (
              <img
                src={selectedProduct.image[0].url}
                alt={selectedProduct.name}
              />
            )}
            {next && (
              <img
                src={selectedProduct.image[1].url}
                alt={selectedProduct.name}
              />
            )}
            <div
              className="arrow"
              style={{ fontSize: "30px" }}
              onClick={handleImgChangeClick}
            >
              <IoIosArrowForward />
            </div>
          </div>

          <div className="rightDiv">
            <div style={{ marginBottom: "10px" }}>
              <label>Color: </label>
              <select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="">Select</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
              </select>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Quantity: </label>
              <input
                type="number"
                min="1"
                value={totalQuantity}
                onChange={(e) => setTotalQuantity(e.target.value)}
              />
            </div>

            <label>Print Location</label>
            <div className="printLocation">
              <div className="PL-left" style={{ marginBottom: "10px" }}>
                <div className="PLCheckboxDiv">
                  <label>
                    <input
                      className="PLCheckbox"
                      type="checkbox"
                      checked={isFrontChecked}
                      onChange={handleFrontCheckboxChange}
                    />
                    Front
                  </label>
                </div>
                {isFrontChecked && (
                  <div>
                    <label>Upload Design: </label>
                    <input
                      className="designInput"
                      type="file"
                      accept="image/*"
                      onChange={handleFrontDesignUpload}
                    />

                    {frontDesignPreview && (
                      <div
                        className="previewDiv"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <h4>Preview:</h4>
                        <img
                          src={frontDesignPreview}
                          alt="Design Preview"
                          style={{
                            width: "100%",
                            maxHeight: "300px",
                            objectFit: "contain",
                          }}
                        />
                        <button
                          className="remove-preview"
                          onClick={() => setFrontDesignPreview(null)}
                        >
                          Remove Design
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="PL-right" style={{ marginBottom: "10px" }}>
                <div className="PLCheckboxDiv">
                  <label>
                    <input
                      className="PLCheckbox"
                      type="checkbox"
                      checked={isBackChecked}
                      onChange={handleBackCheckboxChange}
                    />
                    Back
                  </label>
                </div>

                {isBackChecked && (
                  <div>
                    <label>Upload Design: </label>
                    <input
                      className="designInput"
                      type="file"
                      accept="image/*"
                      onChange={handleBackDesignUpload}
                    />

                    {backDesignPreview && (
                      <div
                        className="previewDiv"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <h4>Preview:</h4>
                        <img
                          src={backDesignPreview}
                          alt="Design Preview"
                          style={{
                            width: "100%",
                            maxHeight: "300px",
                            objectFit: "contain",
                          }}
                        />
                        <button
                          className="remove-preview"
                          onClick={() => setBackDesignPreview(null)}
                        >
                          Remove Design
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* {(frontDesignPreview || backDesignPreview) && (
              <button style={{ width: "100px" }}>Preview</button>
            )} */}

            <div className="productSizes">
              {sizes.map((item, index) => (
                <label key={item.size}>
                  {item.size}
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleSizeChange(index, parseInt(e.target.value) || 0)
                    }
                  />
                </label>
              ))}
            </div>

            <button
              onClick={() => navigate("/customization")}
              style={{ marginTop: "20px", padding: "10px 20px" }}
            >
              Create your Design
            </button>

            <div className="productPrice">
              <h3>Price: ₹{selectedProduct.price}</h3>
            </div>

            <button
              onClick={handleAddToCart}
              style={{ marginTop: "20px", padding: "10px 20px" }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
