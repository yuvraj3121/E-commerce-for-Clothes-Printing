import React from 'react';
import styles from './HeroBanner.module.css';

const HeroBanner = () => {
  return (
    <section className={styles.printoHeroBanner}>
      <div className={styles.printoHeroContent}>
        <h2>Summer Polo Collection</h2>
        <p>Premium quality polo t-shirts starting at just ₹399</p>
        <button className={styles.printoShopNowBtn}>Shop Now</button>
      </div>
    </section>
  );
};
export default HeroBanner;