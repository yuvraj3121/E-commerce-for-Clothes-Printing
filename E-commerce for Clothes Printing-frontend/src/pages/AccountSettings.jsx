import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./AccountSettings.css";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useContext(AuthContext);
  // console.log(user);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    userName: user.userName,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });

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
      alert(error.response?.data?.message || "update failed");
      console.log(error);
    }
    setIsEditing(false);
    console.log("Saved data:", userData);
  };

  const displayValue = (value) => {
    return value || "Not Specified";
  };

  return (
    <div className="account-settings-container">
      <button
        style={{ position: "absolute", top: "10px", left: "10px" }}
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <h1 className="account-settings-title">Account Settings</h1>

      <div className="account-settings-table">
        <div className="table-row">
          <div className="table-header">Username</div>
          <div className="table-data">
            {isEditing ? (
              <input
                type="text"
                name="userName"
                value={userData.userName}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              displayValue(userData.userName)
            )}
          </div>
        </div>

        <div className="table-row">
          <div className="table-header">Fullname</div>
          <div className="table-data">
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              displayValue(userData.fullName)
            )}
          </div>
        </div>

        <div className="table-row">
          <div className="table-header">Email</div>
          <div className="table-data">
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              displayValue(userData.email)
            )}
          </div>
        </div>

        <div className="table-row">
          <div className="table-header">Phone</div>
          <div className="table-data">
            {isEditing ? (
              <input
                type="tel"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              displayValue(userData.phoneNumber)
            )}
          </div>
        </div>

        {/* <div className="table-row">
          <div className="table-header">Gender</div>
          <div className="table-data">
            {isEditing ? (
              <select
                name="gender"
                value={userData.gender}
                onChange={handleInputChange}
                className="edit-input"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              displayValue(userData.gender)
            )}
          </div>
        </div> */}

        {/* <div className="table-row">
          <div className="table-header">Date of Birth</div>
          <div className="table-data">
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              displayValue(userData.dob)
            )}
          </div>
        </div> */}
      </div>

      <div className="button-container">
        {isEditing ? (
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
