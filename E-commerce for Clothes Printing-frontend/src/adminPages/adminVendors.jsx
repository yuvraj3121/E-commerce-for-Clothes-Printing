import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrCheckmark } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { RiNotification4Line } from "react-icons/ri";
import AdminVendorApplication from "./adminVendorApplication";

const AdminVendors = () => {
  const [allVendors, setAllVendors] = useState([]);
  const [viewDetails, setViewDetails] = useState(false);
  const [vendorData, setVendorData] = useState([]);
  const [newVendors, setNewVendors] = useState(false);

  useEffect(() => {
    const fetchAllVendors = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/vendor/AllVendors"
        );
        setAllVendors(
          res.data.vendors.filter((vendor) => vendor.status === "accepted")
        );
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchAllVendors();
  }, [newVendors]);

  const handleViewDetails = async (vendorId) => {
    try {
      await axios
        .get(`http://localhost:8000/api/vendor/vendorData/${vendorId}`)
        .then((res) => {
          setVendorData(res.data.vendor);
          setViewDetails(true);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {newVendors == false ? (
        <div className="bg-white p-6 rounded-xl shadow">
          {viewDetails == false ? (
            <div>
              <div className="flex">
                <h1 className="mb-2 text-xl font-bold text-right w-[53%]">
                  Vendors
                </h1>
                <div className="flex justify-end w-[45%] gap-2">
                  <p
                    className={`text-sm cursor-pointer flex justify-center items-center mb-2 text-blue-400 hover:text-blue-700 hover:bg-blue-100 p-1 rounded-md`}
                    onClick={() => setNewVendors(true)}
                  >
                    <RiNotification4Line className="text-lg" />
                    New Vendors
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vendor ID
                      </th>
                      <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Full Name
                      </th>
                      <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone no.
                      </th>
                      <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Business Name
                      </th>
                      <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allVendors?.length != 0 &&
                      allVendors?.map((vendor) => (
                        <tr key={vendor._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {vendor._id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {vendor.fullName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {vendor.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {vendor.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {vendor.businessName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                            <p
                              className="text-blue-400 cursor-pointer hover:text-blue-700 "
                              onClick={() => handleViewDetails(vendor._id)}
                            >
                              view details
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between mb-2">
                <h1 className="font-bold text-xl">Vendor Details</h1>
                <button
                  className="text-blue-400 hover:text-blue-700 cursor-pointer p-1 hover:bg-blue-100"
                  onClick={() => setViewDetails(false)}
                >
                  {"< Back"}
                </button>
              </div>
              <div className="text-left flex flex-col gap-2">
                <p>Full Name : {vendorData?.fullName}</p>
                <p>Email : {vendorData?.email}</p>
                <p>Phone no. : {vendorData?.phone}</p>
                <p>Business Name : {vendorData?.businessName}</p>
                <div className="flex gap-2">
                  <label>Printing Type : </label>
                  {vendorData?.printingType.map((type) => (
                    <p key={type}>{type}</p>
                  ))}
                </div>
                <div className="flex gap-2">
                  <label>Services : </label>
                  {vendorData?.services.map((service) => (
                    <p key={service}>{service}</p>
                  ))}
                </div>
                <p>
                  Address : {vendorData?.address.streetAddress},{" "}
                  {vendorData?.address.city}, {vendorData?.address.state} {"("}
                  {vendorData?.address.zipCode}
                  {")"}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <AdminVendorApplication setNewVendors={setNewVendors} />
        </div>
      )}
    </div>
  );
};

export default AdminVendors;
