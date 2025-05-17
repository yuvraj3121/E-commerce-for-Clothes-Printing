import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Shop Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#">Men's Polo T-Shirts</a>
              </li>
              <li>
                <a href="#">Women's Polo T-Shirts</a>
              </li>
              <li>
                <a href="#">Kids' Polo T-Shirts</a>
              </li>
              <li>
                <a href="#">Custom Polo T-Shirts</a>
              </li>
              <li>
                <a href="#">New Arrivals</a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#">Track Order</a>
              </li>
              <li>
                <a href="#">Returns & Exchanges</a>
              </li>
              <li>
                <a href="#">Shipping Info</a>
              </li>
              <li>
                <a href="#">Size Guide</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#">Our Story</a>
              </li>
              <li>
                <a href="#">Quality</a>
              </li>
              <li>
                <a href="#">Sustainability</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          {/* Social & Payment */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 text-xl mb-6">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaPinterestP />
              </a>
            </div>
            <div className="flex space-x-4 text-2xl text-gray-300">
              <FaCcVisa />
              <FaCcMastercard />
              <FaCcAmex />
              <FaCcPaypal />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-4 md:mb-0">
            © 2025 DesignDrip. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
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
