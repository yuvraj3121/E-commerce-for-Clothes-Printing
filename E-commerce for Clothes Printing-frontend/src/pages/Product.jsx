import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { incrementCartCount, addToCart } from "../features/cartSlice.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./product.css";

const Product = () => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [designPreview, setDesignPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduct } = useSelector((state) => state.product);
  console.log(selectedProduct);

  const handleDesignUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDesignPreview(URL.createObjectURL(file));
    }
  };

  const handleAddToCart = () => {
    if (!size || !color) {
      alert("Please select size and color");
      return;
    }

    if (quantity < 1) alert("Quantity must be at least 1");

    dispatch(incrementCartCount());

    console.log({ size, color, quantity, designPreview });

    const cartItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      discountedPrice: selectedProduct.discountedPrice,
      image: selectedProduct.image,
      size,
      color,
      quantity,
      designPreview,
    };
    dispatch(addToCart(cartItem));

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
            <div>
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>
          </div>
          <div className="rightDiv">
            <div style={{ marginBottom: "10px" }}>
              <label>Size: </label>
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="">Select</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">X-Large</option>
              </select>
            </div>

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
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Upload Design: </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleDesignUpload}
              />
            </div>

            {designPreview && (
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <h4>Preview:</h4>
                <img
                  src={designPreview}
                  alt="Design Preview"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                  }}
                />
                <button
                  className="remove-preview"
                  onClick={() => setDesignPreview(null)}
                >
                  Remove Design
                </button>
              </div>
            )}

            <button style={{ width: "200px" }}>
              {" "}
              <FaPencilAlt /> Create your Design{" "}
            </button>

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
