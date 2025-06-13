import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import "./App.css";
import Product from "./pages/Product";
import Customization from "./pages/Customization";
import AccountSettings from "./pages/AccountSettings";
import ScrollToTop from "./ScrollToTop";
import ShippingDetails from "./pages/ShippingDetails";
import OrderReview from "./pages/OrderReview";
import Confirmation from "./pages/Confirmation";
import Orders from "./pages/orders";
import OrderDetails from "./pages/orderDetails";
import AdminDashboard from "./adminPages/adminHome";
import AdminHome from "./adminPages/adminHome";
import VendorApplication from "./pages/VendorApplication";
import VendorHome from "./vendorPages/vendorHome";
import ChoicePage from "./pages/ChoicePage";
import Stores from "./pages/stores";
import DeliveryPartnerApplication from "./pages/DeliveryPartnerApplication";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
        <Route path="/customization" element={<Customization />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/shippingDetails" element={<ShippingDetails />} />
        <Route path="/orderReview" element={<OrderReview />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orderDetails" element={<OrderDetails />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/vendorHome" element={<VendorHome />} />
        <Route path="/choicePage" element={<ChoicePage />} />
        <Route path="/vendorApplication" element={<VendorApplication />} />
        <Route
          path="/deliveryPartnerApplication"
          element={<DeliveryPartnerApplication />}
        />
      </Routes>
    </div>
  );
}

export default App;
