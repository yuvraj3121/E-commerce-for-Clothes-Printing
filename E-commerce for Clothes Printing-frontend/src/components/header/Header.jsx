import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { AuthContext } from "../../context/AuthContext";
import { FaSearch } from "react-icons/fa";

const Header = ({ cartCount }) => {
  const { user } = useContext(AuthContext);

  return (
    <header className={styles.printoHeader}>
      <div className={styles.printoHeaderContainer}>
        <div className={styles.printoLogo}>
          <Link to="/">
            <h1>PrintWear</h1>
          </Link>
        </div>

        <div className={styles.printoSearchBar}>
          <input type="text" placeholder="Search for t-shirts..." />
          <button className={styles.printoSearchBtn}>
            <i className="fas fa-search"></i>
            <FaSearch />
          </button>
        </div>

        <div className={styles.printoUserActions}>
          <button className={styles.printoWishlistBtn}>
            <i className="far fa-heart"></i>
          </button>

          <div className={styles.printoCartContainer}>
            <Link to="/cart" className={styles.printoCartBtn}>
              <i className="fas fa-shopping-cart"></i> Cart
              {cartCount > 0 && (
                <span className={styles.printoCartCount}>{cartCount}</span>
              )}
            </Link>
          </div>

          {!user ? (
            <div className={styles.printoAuthContainer}>
              <Link to="/login" className={styles.printoAuthLink}>
                <i className="far fa-user"></i> Login
              </Link>
              <span className={styles.printoAuthDivider}>|</span>
              <Link to="/signup" className={styles.printoAuthLink}>
                Sign Up
              </Link>
            </div>
          ) : (
            <div className={styles.printoUserGreeting}>
              <span>Hello, {user.userName}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
