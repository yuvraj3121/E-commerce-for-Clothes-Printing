import React, { useEffect, useState } from "react";
import Header from "../components/header/Header.jsx";
import axios from "axios";
import { FaPhoneAlt } from "react-icons/fa";

const Stores = () => {
  const store = localStorage.getItem("store");
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchAllVendors = async () => {
      try {
        const res = await axios.get(
          "https://designdrip-v1.onrender.com/api/vendor/AllVendors"
        );
        setStores(
          res.data.vendors.filter(
            (vendor) =>
              vendor.address.city.toLowerCase() === store.toLowerCase()
          )
        );
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchAllVendors();
  }, [store]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-screen-lg mx-auto py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Stores in {store}
        </h1>

        {stores.length > 0 ? (
          <div className="flex flex-col w-[400px] gap-6 text-left">
            {stores.map((store) => (
              <div
                key={store._id}
                className="shadow-md rounded-lg p-6 bg-gray-200"
              >
                <p className="text-xl font-semibold">{store.businessName}</p>
                <p>
                  {store.address.streetAddress}, {store.address.city} {"("}
                  {store.address.zipCode}
                  {")"}
                </p>
                <p className="mt-2 flex items-center ">
                  <FaPhoneAlt className="mr-2 text-yellow-500" /> {store.phone}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">
            No stores found in {store}.
          </p>
        )}
      </div>
    </div>
  );
};

export default Stores;
