import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeliveryPartnerApplication = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get(
            "https://designdrip-v1.onrender.com/api/user/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(res.data.user);
        }
      } catch (err) {
        localStorage.removeItem("token");
      }
    };
    checkAuth();
  }, []);

  const [deliveryPartner, setDeliveryPartner] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [documentFile, setDocumentFile] = useState(null);

  const handleChange = (e) => {
    setDeliveryPartner({ ...deliveryPartner, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !deliveryPartner.fullName ||
      !deliveryPartner.email ||
      !deliveryPartner.phone ||
      !deliveryPartner.address ||
      !deliveryPartner.city ||
      !deliveryPartner.state ||
      !deliveryPartner.zip ||
      !deliveryPartner.country
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (!documentFile) {
      alert("Please upload the required documents.");
      return;
    }

    console.log(documentFile);

    const address = {
      streetAddress: deliveryPartner.address,
      city: deliveryPartner.city,
      state: deliveryPartner.state,
      zipCode: deliveryPartner.zip,
      country: deliveryPartner.country,
    };
    const formData = new FormData();
    formData.append("fullName", deliveryPartner.fullName);
    formData.append("email", deliveryPartner.email);
    formData.append("phone", deliveryPartner.phone);
    formData.append("address", JSON.stringify(address));
    if (documentFile) formData.append("requiredDocuments", documentFile);
    console.log([...formData.entries()]);

    try {
      await axios.post(
        `https://localhost:8000/api/deliveryPartner/registerDeliveryPartner/${user._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Application Submitted for Approval!");
      navigate("/");
    } catch (error) {
      console.error("Error registering delivery partner:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <button
        className="absolute top-4 left-4 p-1 text-blue-500 hover:bg-blue-50"
        onClick={() => navigate("/")}
      >
        {"<"} Back
      </button>
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Delivery Partner Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="fullName"
              placeholder="Full Name"
              className="border p-2 rounded w-full"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 rounded w-full"
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="border p-2 rounded w-full"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="address"
              placeholder="Street Address"
              className="border p-2 rounded w-full"
              onChange={handleChange}
            />
            <input
              name="city"
              placeholder="City"
              className="border p-2 rounded w-full"
              onChange={handleChange}
            />
            <input
              name="state"
              placeholder="State"
              className="border p-2 rounded w-full"
              onChange={handleChange}
            />
            <input
              name="zip"
              placeholder="ZIP Code"
              className="border p-2 rounded w-full"
              onChange={handleChange}
            />
            <input
              name="country"
              placeholder="Country"
              className="border p-2 rounded w-full col-span-2"
              onChange={handleChange}
            />
          </div>

          <label className="block text-gray-600 font-medium">
            Upload Required Documents (PDF)
          </label>
          <input
            type="file"
            name="documentFile"
            accept="application/pdf"
            className="border p-2 rounded w-full"
            onChange={handleFileUpload}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-6 py-3 rounded hover:bg-blue-600 w-full"
          >
            Submit for Approval
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryPartnerApplication;
