import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineFileDownloadDone } from "react-icons/md";

const VendorAccount = ({ vendorId }) => {
  const [vendorDetails, setVendorDetails] = useState(null);
  const [printingType, setPrintingType] = useState(null);
  const [services, setServices] = useState(null);
  const [editType, setEditType] = useState(false);
  const [editServices, setEditServices] = useState(false);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://designdrip-v1.onrender.com/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const userId = response.data.user._id;
        const res = await axios.get(
          `https://designdrip-v1.onrender.com/api/vendor/vendorDataByUserId/${userId}`
        );
        setVendorDetails(res.data.vendor);
        const typeString = res.data.vendor.printingType.join(", ");
        const serviceString = res.data.vendor.services.join(", ");
        setPrintingType(typeString);
        setServices(serviceString);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVendor();
  }, [editServices, editType]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "printingType") {
      setPrintingType(value);
    } else if (name === "services") {
      setServices(value);
    }
  };

  const handleEdit = async () => {
    const printingTypeArray = printingType
      .toLowerCase()
      .split(",")
      .map((item) => item.trim());
    const servicesArray = services
      .toLowerCase()
      .split(",")
      .map((item) => item.trim());

    try {
      const res = await axios.patch(
        `https://designdrip-v1.onrender.com/api/vendor/updateDetails/${vendorId}`,
        {
          printingType: printingTypeArray,
          services: servicesArray,
        }
      );
      alert("Updated Successfully.");
      console.log(res.data);
      setEditType(false);
      setEditServices(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <table className="table-auto border-collapse border w-full mb-4">
        <tbody>
          <tr>
            <td className="px-4 py-2 font-semibold">Vendor ID</td>
            <td className="px-4 py-2 font-semibold">:</td>
            <td className="px-4 py-2">{vendorId}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Full Name</td>
            <td className="px-4 py-2 font-semibold">:</td>
            <td className="px-4 py-2">{vendorDetails?.fullName}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Email</td>
            <td className="px-4 py-2 font-semibold">:</td>
            <td className="px-4 py-2">{vendorDetails?.email}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Phone No.</td>
            <td className="px-4 py-2 font-semibold">:</td>
            <td className="px-4 py-2">{vendorDetails?.phone}</td>
          </tr>
        </tbody>
      </table>
      <h2 className="font-bold text-lg mb-4">Business Details</h2>
      <table className="table-auto border-collapse border w-full mb-4">
        <tbody>
          <tr>
            <td className="px-4 py-2 font-semibold">Business Name</td>
            <td className="px-4 py-2 font-semibold">:</td>
            <td className="px-4 py-2">{vendorDetails?.businessName}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Printing Type</td>
            <td className="px-4 py-2 font-semibold">:</td>
            <td className="px-4 py-2 flex gap-1">
              <input
                type="text"
                name="printingType"
                value={printingType}
                onChange={handleChange}
                disabled={!editType}
                className="text-center"
              />
              {!editType ? (
                <CiEdit
                  className="h-[35px] w-[35px] rounded-md bg-gray-200 cursor-pointer hover:bg-gray-500 border border-solid"
                  onClick={() => setEditType(true)}
                />
              ) : (
                <MdOutlineFileDownloadDone
                  className="h-[35px] w-[35px] rounded-md bg-gray-200 cursor-pointer hover:bg-gray-500 border border-solid"
                  onClick={handleEdit}
                />
              )}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Services</td>
            <td className="px-4 py-2 font-semibold">:</td>
            <td className="px-4 py-2 flex gap-1">
              <input
                type="text"
                name="services"
                value={services}
                onChange={handleChange}
                disabled={!editServices}
                className="text-center"
              />
              {!editServices ? (
                <CiEdit
                  className="h-[35px] w-[35px] rounded-md bg-gray-200 cursor-pointer hover:bg-gray-500 border border-solid"
                  onClick={() => setEditServices(true)}
                />
              ) : (
                <MdOutlineFileDownloadDone
                  className="h-[35px] w-[35px] rounded-md bg-gray-200 cursor-pointer hover:bg-gray-500 border border-solid"
                  onClick={handleEdit}
                />
              )}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Address</td>
            <td className="px-4 py-2 font-semibold">:</td>
            <td className="px-4 py-2">
              {vendorDetails?.address.streetAddress}
              {", "}
              {vendorDetails?.address.city}
              {", "}
              {vendorDetails?.address.state}
              {" ("}
              {vendorDetails?.address.zipCode}
              {")"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VendorAccount;
