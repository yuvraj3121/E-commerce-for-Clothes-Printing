import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleClick = (store) => {
    localStorage.setItem("store", store);
    navigate("/stores");
  };

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-lg font-semibold mb-4">Find Stores</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    handleClick("Raipur");
                  }}
                >
                  Raipur
                </span>
              </li>
              <li>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    handleClick("Bangalore");
                  }}
                >
                  Bangalore
                </span>
              </li>
              <li>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    handleClick("Mumbai");
                  }}
                >
                  Mumbai
                </span>
              </li>
              <li>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    handleClick("Pune");
                  }}
                >
                  Pune
                </span>
              </li>
              <li>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    handleClick("New Delhi");
                  }}
                >
                  New Delhi
                </span>
              </li>
            </ul>
          </div>

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
