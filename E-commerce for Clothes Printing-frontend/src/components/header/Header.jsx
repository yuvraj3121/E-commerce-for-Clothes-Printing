import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { AuthContext } from "../../context/AuthContext";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Header = ({ cartCount }) => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <header className={styles.printoHeader}>
      <div className={styles.printoHeaderContainer}>
        <div className={styles.printoLogo}>
          <Link to="/">
            <h1>DesignDrip</h1>
          </Link>
        </div>

        <div className={styles.printoSearchBar}>
          <input type="text" placeholder="Search for t-shirts..." />
          <button className={styles.printoSearchBtn}>
            <FaSearch />
          </button>
        </div>

        <div className={styles.printoUserActions}>
          <button className={styles.printoWishlistBtn}>
            <FaHeart />
          </button>

          <div className={styles.printoCartContainer}>
            <Link to="/cart" className={styles.printoCartBtn}>
              <FaShoppingCart /> Cart
              {cartCount > 0 && (
                <span className={styles.printoCartCount}>{cartCount}</span>
              )}
            </Link>
          </div>

          {!user ? (
            <div className={styles.printoAuthContainer}>
              <Link to="/login" className={styles.printoAuthLink}>
                Login
              </Link>
              <span className={styles.printoAuthDivider}>|</span>
              <Link to="/signup" className={styles.printoAuthLink}>
                Sign Up
              </Link>
            </div>
          ) : (
            <div className={styles.printoUserDropdown} ref={dropdownRef}>
              <div
                className={styles.printoUserGreeting}
                onClick={toggleDropdown}
              >
                <span>Hello, {user.userName}</span>
                {isDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link
                    to="/orders"
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/account-settings"
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Account Settings
                  </Link>
                  <button
                    className={styles.dropdownItem}
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
