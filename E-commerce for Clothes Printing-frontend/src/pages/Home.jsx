import React, { useState, useEffect } from "react";

import HeroBanner from "../components/hero-banner/HeroBanner";
import ProductFilters from "../components/product-filters/ProductFilters";
import ProductGrid from "../components/product-grid/ProductGrid";
import Header from '../components/header/Header';
import Navigation from '../components/navigation/Navigation';
import Newsletter from '../components/newsletter/Newsletter';
import Footer from '../components/footer/Footer';
import styles from './Home.module.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Mock data
        const mockProducts = [
          {
            id: 1,
            name: "Classic Polo T-Shirt",
            price: 599,
            discountedPrice: 449,
            image:
              "https://printo.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/o/polo_tshirt_men_white_1.jpg",
            colors: ["white", "black", "blue", "red"],
            sizes: ["S", "M", "L", "XL"],
          },
          {
            id: 2,
            name: "Premium Cotton Polo",
            price: 799,
            discountedPrice: 649,
            image:
              "https://printo.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/o/polo_tshirt_men_navy_1.jpg",
            colors: ["navy", "gray", "green"],
            sizes: ["M", "L", "XL"],
          },
          {
            id: 3,
            name: "Slim Fit Polo",
            price: 899,
            discountedPrice: 699,
            image:
              "https://printo.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/o/polo_tshirt_men_black_1.jpg",
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
    <div className="printoHomePage">  {/* Changed from styles.printoHomePage */}
      <Header cartCount={cartCount} />
      <Navigation />
      <HeroBanner />
  
      <main className="printoMainContent">  {/* Changed from styles.printoMainContent */}
        <div className="printoContainer">  {/* Changed from styles.printoContainer */}
          <ProductFilters />
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
