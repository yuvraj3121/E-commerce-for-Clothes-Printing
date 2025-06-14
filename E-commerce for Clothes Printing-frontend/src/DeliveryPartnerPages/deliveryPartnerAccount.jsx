import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineFileDownloadDone } from "react-icons/md";

const DeliveryPartnerAccount = () => {
  const [deliveryPartnerDetails, setDeliveryPartnerDetails] = useState(null);
  const [deliveryPartnerId, setDeliveryPartnerId] = useState(null);

  useEffect(() => {
    const fetchDeliveryPartner = async () => {
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
          `https://designdrip-v1.onrender.com/api/deliveryPartner/deliveryPartnerDataByUserId/${userId}`
        );
        setDeliveryPartnerDetails(res.data.deliveryPartner);
        setDeliveryPartnerId(res.data.deliveryPartner._id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeliveryPartner();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <table className="table-auto border-collapse border w-full mb-4">
        <tbody>
          <tr>
            <td className="px-4 py-2 font-semibold">Delivery Partner ID</td>
            <td className="px-4 py-2 font-semibold">:</td>
            <td className="px-4 py-2">{deliveryPartnerId}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Full Name</td>
            <td className="px-4 py-2 font-semibold">:</td>
            <td className="px-4 py-2">{deliveryPartnerDetails?.fullName}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Email</td>
            <td className="px-4 py-2 font-semibold">:</td>
            <td className="px-4 py-2">{deliveryPartnerDetails?.email}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Phone No.</td>
            <td className="px-4 py-2 font-semibold">:</td>
            <td className="px-4 py-2">{deliveryPartnerDetails?.phone}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Address</td>
            <td className="px-4 py-2 font-semibold">:</td>
            <td className="px-4 py-2">
              {deliveryPartnerDetails?.address.streetAddress}
              {", "}
              {deliveryPartnerDetails?.address.city}
              {", "}
              {deliveryPartnerDetails?.address.state}
              {" ("}
              {deliveryPartnerDetails?.address.zipCode}
              {")"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryPartnerAccount;
