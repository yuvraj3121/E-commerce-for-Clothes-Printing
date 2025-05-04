import React from 'react';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.printoNavigation}>
      <div className={styles.printoNavContainer}>
        <ul className={styles.printoNavList}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Men</a></li>
          <li className={styles.printoActive}><a href="#">Polo T-Shirts</a></li>
          <li><a href="#">Women</a></li>
          <li><a href="#">Kids</a></li>
          <li><a href="#">Customize</a></li>
          <li><a href="#">Offers</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;