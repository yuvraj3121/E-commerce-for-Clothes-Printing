import React, { useState, useEffect } from "react";

import HeroBanner from "../components/hero-banner/HeroBanner";
import ProductFilters from "../components/product-filters/ProductFilters";
import ProductGrid from "../components/product-grid/ProductGrid";
import Header from "../components/header/Header";
import Navigation from "../components/navigation/Navigation";
import Newsletter from "../components/newsletter/Newsletter";
import Footer from "../components/footer/Footer";
import styles from "./Home.module.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const mockProducts = [
          {
            id: 1,
            name: "Classic Polo T-Shirt",
            price: 599,
            discountedPrice: 449,
            image:
              "https://img.freepik.com/premium-vector/realistic-mockup-male-white-polo-shirt_107791-2142.jpg?w=1060",
            colors: ["white", "black", "blue", "red"],
            sizes: ["S", "M", "L", "XL"],
          },
          {
            id: 2,
            name: "Round Neck T-Shirt",
            price: 799,
            discountedPrice: 649,
            image:
              "https://img.freepik.com/premium-photo/blank-white-t-shirt-mockup_53876-950169.jpg?w=740",
            colors: ["navy", "gray", "green"],
            sizes: ["M", "L", "XL"],
          },
          {
            id: 3,
            name: "V Neck T-Shirt",
            price: 899,
            discountedPrice: 699,
            image:
              "https://img.freepik.com/premium-vector/realistic-t-shirt-white-mockup-blank-tee-brand-identity-promotion-clothing-cotton-casual-apparel-with-no-brand_208581-797.jpg?w=826",
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
    <div className="printoHomePage">
      {" "}
      {/* Changed from styles.printoHomePage */}
      <Header cartCount={cartCount} />
      <Navigation />
      <HeroBanner />
      <main className="printoMainContent">
        {" "}
        {/* Changed from styles.printoMainContent */}
        <div className="printoContainer">
          {" "}
          {/* Changed from styles.printoContainer */}
          {/* <ProductFilters /> */}
          <ProductGrid
            products={products}
            loading={loading}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
          />
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};
export default HomePage;
