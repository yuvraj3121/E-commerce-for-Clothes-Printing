import React, { useState, useEffect } from "react";
import { CiFilter } from "react-icons/ci";

import HeroBanner from "../components/hero-banner/HeroBanner";
import ProductGrid from "../components/product-grid/ProductGrid";
import Header from "../components/header/Header";
import Newsletter from "../components/newsletter/Newsletter";
import Footer from "../components/footer/Footer";
import ProductFilters from "../components/product-filters/ProductFilters";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false); // Toggle state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const mockProducts = [
          {
            id: 1,
            name: "Classic Polo T-Shirt",
            category: "T-Shirts",
            price: 599,
            discountedPrice: 449,
            image: [
              { side: "Front", url: "/poloFront.jpg" },
              { side: "Back", url: "/poloBack.jpg" },
            ],
            colors: ["white", "black", "blue", "red"],
            sizes: ["S", "M", "L", "XL"],
          },
          {
            id: 2,
            name: "Round Neck T-Shirt",
            category: "T-Shirts",
            price: 799,
            discountedPrice: 649,
            image: [
              { side: "Front", url: "/rneckFront.jpg" },
              { side: "Back", url: "/rneckBack.jpg" },
            ],
            colors: ["navy", "gray", "green"],
            sizes: ["M", "L", "XL"],
          },
          {
            id: 3,
            name: "V Neck T-Shirt",
            category: "T-Shirts",
            price: 899,
            discountedPrice: 699,
            image: [
              { side: "Front", url: "/vneckFront.jpg" },
              { side: "Back", url: "/vneckBack.jpg" },
            ],
            colors: ["black", "white", "maroon"],
            sizes: ["S", "M", "L"],
          },
        ];
        setProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId) => {
    setCartCount((prev) => prev + 1);
    console.log(`Product ${productId} added to cart`);
  };

  const handleToggleWishlist = (productId) => {
    console.log(`Product ${productId} wishlist toggled`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header cartCount={cartCount} />
      <div className="mb-6">
        <HeroBanner />
      </div>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Featured T-Shirts
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Browse through our exclusive collection
          </p>

          {/* <div className="flex justify-start mb-6">
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium"
            >
              <CiFilter className="text-lg" />
              Filter
            </button>
          </div> */}
          {/* 
          {showFilters && (
            <div className="mb-6">
              <ProductFilters />
            </div>
          )} */}

          <ProductGrid
            products={products}
            loading={loading}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
          />
        </div>
      </main>

      {/* <div className="bg-blue-600 text-white py-10 mt-12">
        <Newsletter />
      </div> */}

      <Footer />
    </div>
  );
};

export default HomePage;
