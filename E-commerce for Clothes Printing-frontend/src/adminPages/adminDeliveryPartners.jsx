import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrCheckmark } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { RiNotification4Line } from "react-icons/ri";
import AdminDeliveryPartnerApplication from "./adminDeliveryPartnerApplication";

const AdminDeliveryPartners = () => {
  const [allDeliveryPartners, setAllDeliveryPartners] = useState([]);
  const [viewDetails, setViewDetails] = useState(false);
  const [deliveryPartnerData, setDeliveryPartnerData] = useState([]);
  const [newDeliveryPartners, setNewDeliveryPartners] = useState(false);

  useEffect(() => {
    const fetchAllDeliveryPartners = async () => {
      try {
        const res = await axios.get(
          "https://designdrip-v1.onrender.com/api/deliveryPartner/AllDeliveryPartners"
        );
        setAllDeliveryPartners(
          res.data.deliveryPartners.filter(
            (partner) => partner.status === "accepted"
          )
        );
      } catch (error) {
        console.error("Error fetching delivery partners:", error);
      }
    };
    fetchAllDeliveryPartners();
  }, [newDeliveryPartners]);

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

  return (
    <div>
      {newDeliveryPartners == false ? (
        <div className="bg-white p-6 rounded-xl shadow">
          {viewDetails == false ? (
            <div>
              <div className="flex">
                <h1 className="mb-2 text-xl font-bold text-right w-[53%]">
                  Delivery Partners
                </h1>
                <div className="flex justify-end w-[45%] gap-2">
                  <p
                    className={`text-sm cursor-pointer flex justify-center items-center mb-2 text-blue-400 hover:text-blue-700 hover:bg-blue-100 p-1 rounded-md`}
                    onClick={() => setNewDeliveryPartners(true)}
                  >
                    <RiNotification4Line className="text-lg" />
                    New Delivery Partners
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
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <AdminDeliveryPartnerApplication
            setNewDeliveryPartners={setNewDeliveryPartners}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDeliveryPartners;
