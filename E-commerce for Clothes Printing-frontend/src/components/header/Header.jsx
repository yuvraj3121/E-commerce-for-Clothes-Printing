import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            DesignDrip
          </Link>
        </div>

        <div className="flex flex-1 max-w-lg mx-4">
          <input
            type="text"
            placeholder="Search for t-shirts..."
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <FaSearch />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            aria-label="Wishlist"
            className="p-2 rounded-full hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors"
          >
            <FaHeart className="text-xl" />
          </button>

          <div>
            <Link
              to="/cart"
              className="relative flex items-center space-x-1 text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <FaShoppingCart className="text-xl" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-semibold rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {!user ? (
            <div className="flex items-center space-x-2 text-gray-700">
              <Link
                to="/login"
                className="hover:text-blue-600 focus:outline-none focus:underline"
              >
                Login
              </Link>
              <span className="select-none">|</span>
              <Link
                to="/signup"
                className="hover:text-blue-600 focus:outline-none focus:underline"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 p-2 rounded-md hover:bg-blue-100 text-gray-700 hover:text-blue-700 transition-colors"
              >
                <span>Hello, {user.userName}</span>
                {isDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <Link
                    to="/orders"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/account-settings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                  >
                    Account Settings
                  </Link>
                  {user.role == "user" && (
                    <Link
                      to="/vendorApplication"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                    >
                      Apply as Vendor
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 flex items-center space-x-2"
                  >
                    <FaSignOutAlt /> <span>Logout</span>
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
