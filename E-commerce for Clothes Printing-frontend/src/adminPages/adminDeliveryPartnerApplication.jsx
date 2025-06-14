import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrCheckmark } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { RiNotification4Line } from "react-icons/ri";

const AdminDeliveryPartnerApplication = ({ setNewDeliveryPartners }) => {
  const [allDeliveryPartners, setAllDeliveryPartners] = useState([]);
  const [viewDetails, setViewDetails] = useState(false);
  const [deliveryPartnerData, setDeliveryPartnerData] = useState([]);

  useEffect(() => {
    const fetchAllDeliveryPartners = async () => {
      try {
        const res = await axios.get(
          "https://designdrip-v1.onrender.com/api/deliveryPartner/AllDeliveryPartners"
        );
        setAllDeliveryPartners(
          res.data.deliveryPartners.filter(
            (partner) => partner.status === "pending"
          )
        );
      } catch (error) {
        console.error("Error fetching delivery partners:", error);
      }
    };
    fetchAllDeliveryPartners();
  }, [viewDetails]);

  const handleViewDetails = async (deliveryPartnerId) => {
    try {
      await axios
        .get(
          `https://designdrip-v1.onrender.com/api/deliveryPartner/deliveryPartnerData/${deliveryPartnerId}`
        )
        .then((res) => {
          setDeliveryPartnerData(res.data.deliveryPartner);
          setViewDetails(true);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (userId, deliveryPartnerId) => {
    console.log(userId, deliveryPartnerId);
    try {
      await axios
        .patch(
          "https://designdrip-v1.onrender.com/api/deliveryPartner/changeDeliveryPartnerStatus",
          {
            userId,
            deliveryPartnerId,
          }
        )
        .then((res) => {
          console.log(res.data);
          setViewDetails(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (deliveryPartnerId) => {
    try {
      await axios
        .delete(
          `https://designdrip-v1.onrender.com/api/deliveryPartner/deleteDeliveryPartner/${deliveryPartnerId}`
        )
        .then((res) => {
          console.log(res.data);
          setViewDetails(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {viewDetails == false ? (
        <div className="mb-4">
          <div className="flex">
            <h1 className="mb-2 text-xl font-bold text-right w-[53%]">
              New Delivery Partners
            </h1>
            <div className="flex justify-end w-[45%]">
              <p
                className="cursor-pointer text-blue-400 hover:text-blue-700"
                onClick={() => setNewDeliveryPartners(false)}
              >
                {"< "}back
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Partner ID
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
                  <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allDeliveryPartners?.length != 0 &&
                  allDeliveryPartners?.map((partner) => (
                    <tr key={partner._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {partner._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {partner.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {partner.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {partner.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                        <p
                          className="text-blue-400 cursor-pointer hover:text-blue-700 "
                          onClick={() => handleViewDetails(partner._id)}
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
            <h1 className="font-bold text-xl">Delivery Partner Details</h1>
            <button
              className="text-blue-400 hover:text-blue-700 cursor-pointer p-1 hover:bg-blue-100"
              onClick={() => setViewDetails(false)}
            >
              {"< Back"}
            </button>
          </div>
          <div className="text-left flex flex-col gap-2">
            <p>Full Name : {deliveryPartnerData?.fullName}</p>
            <p>Email : {deliveryPartnerData?.email}</p>
            <p>Phone no. : {deliveryPartnerData?.phone}</p>
            <p>
              Address : {deliveryPartnerData?.address.streetAddress},{" "}
              {deliveryPartnerData?.address.city},{" "}
              {deliveryPartnerData?.address.state} {"("}
              {deliveryPartnerData?.address.zipCode}
              {")"}
            </p>
            {deliveryPartnerData.status == "pending" && (
              <div className="flex gap-2">
                <button
                  className="flex justify-center items-center gap-1 text-green-400 hover:text-green-700 hover:bg-green-100 p-2 "
                  onClick={() =>
                    handleAccept(
                      deliveryPartnerData?.userId,
                      deliveryPartnerData?._id
                    )
                  }
                >
                  <GrCheckmark />
                  accept
                </button>
                <button
                  className="flex justify-center items-center gap-1 text-red-400 hover:text-red-700 hover:bg-red-100 p-2"
                  onClick={() => handleReject(deliveryPartnerData?._id)}
                >
                  <RxCross2 /> reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDeliveryPartnerApplication;
