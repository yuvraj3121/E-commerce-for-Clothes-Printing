import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";

const AccountSettings = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useContext(AuthContext);
  console.log(user);

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    userName: user.userName,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });

  const [passwordChange, setPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(userData);
      alert("Updated Successfully.");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
      console.log(error);
    }
    setIsEditing(false);
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    try {
      alert("Password Updated Successfully.");
      setPasswordChange(false);
    } catch (error) {
      alert(error.response?.data?.message || "Password update failed");
      console.log(error);
    }
  };

  const displayValue = (value) => value || "Not Specified";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        className="text-sm text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition px-2 py-1 rounded"
        onClick={() => navigate("/")}
      >
        ← Home
      </button>

      <h1 className="text-2xl font-bold mb-6">Account Details</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="font-medium w-1/4">Username</div>
          <div className="w-3/4">
            {isEditing ? (
              <input
                type="text"
                name="userName"
                value={userData.userName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
            ) : (
              <span className="text-gray-700">
                {displayValue(userData.userName)}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="font-medium w-1/4">Fullname</div>
          <div className="w-3/4">
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
            ) : (
              <span className="text-gray-700">
                {displayValue(userData.fullName)}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="font-medium w-1/4">Email</div>
          <div className="w-3/4">
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
            ) : (
              <span className="text-gray-700">
                {displayValue(userData.email)}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="font-medium w-1/4">Phone</div>
          <div className="w-3/4">
            {isEditing ? (
              <input
                type="tel"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
            ) : (
              <span className="text-gray-700">
                {displayValue(userData.phoneNumber)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setUserData({
                    userName: user.userName,
                    fullName: user.fullName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                  });
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="mt-10">
        <button
          className="flex items-center text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition px-3 py-1 rounded"
          onClick={() => setPasswordChange((prev) => !prev)}
        >
          <RiLockPasswordFill className="mr-2" />
          {passwordChange ? "Cancel" : "Change Password"}
        </button>

        {passwordChange && (
          <form
            onSubmit={handlePasswordSave}
            className="bg-white p-6 rounded shadow space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
