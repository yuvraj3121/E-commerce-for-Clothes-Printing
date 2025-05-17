import React from "react";
import { useNavigate } from "react-router-dom";
import { setSelectedProduct } from "../../features/productSlice";
import { useDispatch } from "react-redux";

const ProductCard = ({ product, onAddToCart, onToggleWishlist }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleclick = () => {
    dispatch(setSelectedProduct(product));
    navigate("/Product");
  };

  return (
    <div
      onClick={handleclick}
      className="cursor-pointer border rounded-md overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 relative bg-white"
    >
      <div className="relative">
        <img
          src={product.image[0].url}
          alt={product.name}
          className="w-full h-64 object-contain"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none"
          aria-label="Toggle Wishlist"
        >
          <i className="far fa-heart text-2xl"></i>
        </button>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          Quick View
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-blue-600 font-bold text-lg">
            ₹{product.discountedPrice}
          </span>
          <span className="line-through text-gray-400 text-sm">
            ₹{product.price}
          </span>
          <span className="text-red-600 font-semibold text-sm">
            {Math.round((1 - product.discountedPrice / product.price) * 100)}%
            OFF
          </span>
        </div>
        <div className="flex space-x-2">
          {product.colors.map((color) => (
            <span
              key={color}
              className="w-5 h-5 rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
            ></span>
          ))}
        </div>
        {/* Uncomment to enable Add to Cart button */}
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product.id);
          }}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;
