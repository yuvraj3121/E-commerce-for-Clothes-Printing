import React from 'react';
import styles from './ProductFilters.module.css';

const ProductFilters = () => {
  return (
    <div className={styles.printoFilters}>
      <div className={styles.printoFilterSection}>
        <h3>Filter By</h3>
        <div className={styles.printoFilterOptions}>
          <div className={styles.printoFilterGroup}>
            <h4>Price</h4>
            <div className={styles.printoPriceRange}>
              <input type="range" min="0" max="2000" step="100" />
              <div className={styles.printoPriceLabels}>
                <span>₹0</span>
                <span>₹2000</span>
              </div>
            </div>
          </div>
          <div className={styles.printoFilterGroup}>
            <h4>Color</h4>
            <div className={styles.printoColorOptions}>
              {['white', 'black', 'blue', 'red', 'navy', 'gray', 'green', 'yellow'].map(color => (
                <button key={color} className={styles.printoColorOption} style={{ backgroundColor: color }}></button>
              ))}
            </div>
          </div>
          <div className={styles.printoFilterGroup}>
            <h4>Size</h4>
            <div className={styles.printoSizeOptions}>
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button key={size} className={styles.printoSizeOption}>{size}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductFilters;