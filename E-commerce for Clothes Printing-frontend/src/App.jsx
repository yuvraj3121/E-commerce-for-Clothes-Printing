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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
        <Route path="/customization" element={<Customization />} />
        <Route path="/account-settings" element={<AccountSettings />} />
      </Routes>
    </div>
  );
}
export default App;
