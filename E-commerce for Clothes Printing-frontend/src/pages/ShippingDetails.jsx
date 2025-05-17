import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../features/shippingDetailsSlice";

const ShippingDetails = ({ onNext }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(setUserDetails(form));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <button
        className="text-sm text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition px-2 py-1 rounded mb-6"
        onClick={() => navigate("/cart")}
      >
        {"< "}Back to Cart
      </button>
      <h2 className="text-2xl font-semibold mb-6">Shipping Details</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">State</label>
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">ZIP Code</label>
          <input
            type="text"
            name="zip"
            value={form.zip}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div className="col-span-full">
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onClick={() => navigate("/orderReview")}
          >
            Continue to Order Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingDetails;
