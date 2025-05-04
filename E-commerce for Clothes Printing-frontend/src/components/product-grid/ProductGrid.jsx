import React from 'react';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ products, loading, onAddToCart, onToggleWishlist }) => {
  return (
    <div className={styles.printoProductGrid}>
      <div className={styles.printoSortOptions}>
        <span>Sort By:</span>
        <select className={styles.printoSortSelect}>
          <option>Popularity</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest First</option>
          <option>Customer Rating</option>
        </select>
      </div>

      {loading ? (
        <div className={styles.printoLoadingSpinner}>
          <div className={styles.printoSpinner}></div>
          <p>Loading polo t-shirts...</p>
        </div>
      ) : (
        <div className={styles.printoProductsContainer}>
          {products.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;