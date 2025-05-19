import React, { useState } from "react";
import ProductCard from "../product-card/ProductCard";

const categories = ["All", "T-Shirts", "Hoodies", "Jackets", "Caps"];

const ProductGrid = ({ products, loading, onAddToCart, onToggleWishlist }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const productsByCategory = {
    "T-Shirts": products,
    Hoodies: products,
    Jackets: products,
    Caps: products,
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full border transition-colors whitespace-nowrap
              ${
                selectedCategory === category
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
              }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      ) : selectedCategory === "All" ? (
        <>
          {categories
            .filter((cat) => cat !== "All")
            .map((category) => (
              <section key={category} className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {productsByCategory[category].map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                      onToggleWishlist={onToggleWishlist}
                    />
                  ))}
                </div>
              </section>
            ))}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">{selectedCategory}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsByCategory[selectedCategory].map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;
