import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.printoFooter}>
      <div className={styles.printoFooterContainer}>
        <div className={styles.printoFooterSections}>
          <div className={styles.printoFooterSection}>
            <h3>Shop</h3>
            <ul>
              <li><a href="#">Men's Polo T-Shirts</a></li>
              <li><a href="#">Women's Polo T-Shirts</a></li>
              <li><a href="#">Kids' Polo T-Shirts</a></li>
              <li><a href="#">Custom Polo T-Shirts</a></li>
              <li><a href="#">New Arrivals</a></li>
            </ul>
          </div>
          <div className={styles.printoFooterSection}>
            <h3>Help</h3>
            <ul>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className={styles.printoFooterSection}>
            <h3>About</h3>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Quality</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className={styles.printoFooterSection}>
            <h3>Connect With Us</h3>
            <div className={styles.printoSocialIcons}>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-pinterest-p"></i></a>
            </div>
            <div className={styles.printoPaymentMethods}>
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-amex"></i>
              <i className="fab fa-cc-paypal"></i>
            </div>
          </div>
        </div>
        <div className={styles.printoFooterBottom}>
          <p>© 2023 Printo. All Rights Reserved.</p>
          <div className={styles.printoLegalLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Shipping Policy</a>
            <a href="#">Return Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;