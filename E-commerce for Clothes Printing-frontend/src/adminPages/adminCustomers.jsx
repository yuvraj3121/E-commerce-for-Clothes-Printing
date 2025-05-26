import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminCustomers = () => {
  const [allUsers, setAllUsers] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get("https://designdrip-v1.onrender.com/api/user/allUsers")
        .then((res) => setAllUsers(res.data.users))
        .catch((err) => console.log(err));
    };
    getUsers();
  }, []);

  // console.log(allUsers);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="mb-2 text-xl font-bold">Customers</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                username
              </th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                email
              </th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                phone
              </th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allUsers?.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {user._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.userName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
