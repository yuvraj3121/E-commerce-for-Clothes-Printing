import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const VendorApplication = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user._id;
  console.log("userid", user);
  // useEffect(() => {
  //   const fetchVendor = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:8000/api/vendor/vendorDataByUserId/${userId}`
  //       );
  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchVendor();
  // }, []);

  const [vendor, setVendor] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    printingType: "",
    services: "",
    serviceTime: "7-10 days",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [documentFile, setDocumentFile] = useState(null);

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !vendor.fullName ||
      !vendor.email ||
      !vendor.phone ||
      !vendor.businessName ||
      !vendor.printingType ||
      !vendor.services ||
      !vendor.address ||
      !vendor.city ||
      !vendor.state ||
      !vendor.zip ||
      !vendor.country
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (!documentFile) {
      alert("Please upload the required documents.");
      return;
    }

    console.log(documentFile);

    const printingTypeArray = vendor.printingType
      .toLowerCase()
      .split(",")
      .map((item) => item.trim());
    const servicesArray = vendor.services
      .toLowerCase()
      .split(",")
      .map((item) => item.trim());
    const address = {
      streetAddress: vendor.address,
      city: vendor.city,
      state: vendor.state,
      zipCode: vendor.zip,
      country: vendor.country,
    };
    const formData = new FormData();
    formData.append("fullName", vendor.fullName);
    formData.append("email", vendor.email);
    formData.append("phone", vendor.phone);
    formData.append("businessName", vendor.businessName);
    formData.append("printingType", JSON.stringify(printingTypeArray));
    formData.append("services", JSON.stringify(servicesArray));
    formData.append("address", JSON.stringify(address));
    if (documentFile) formData.append("requiredDocuments", documentFile);
    console.log([...formData.entries()]);

    try {
      await axios.post(
        `http://localhost:8000/api/vendor/registerVendor/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Vendor Registration Submitted for Approval!");
      navigate("/");
    } catch (error) {
      console.error("Error registering vendor:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
      <button
        className="absolute top-4 left-4 p-1 text-blue-500 hover:bg-blue-50"
        onClick={() => navigate("/")}
      >
        {"<"} Back
      </button>
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Vendor Registration
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
            <input
              name="businessName"
              placeholder="Business Name"
              className="border p-2 rounded w-full"
              onChange={handleChange}
            />
          </div>

          <input
            name="printingType"
            placeholder="Printing Type (e.g., Screen, Digital)"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <input
            name="services"
            placeholder="Services"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <select
            name="serviceTime"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          >
            <option value="7-10 days">7-10 days</option>
            <option value="10-15 days">10-15 days</option>
            <option value="15-20 days">15-20 days</option>
          </select>

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

export default VendorApplication;
