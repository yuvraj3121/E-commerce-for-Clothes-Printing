import React, { useState } from "react";
import "./AccountSettings.css";

const AccountSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "user@example.com",
    phone: "9876543210",
    gstin: "",
    companyName: "",
    gender: "",
    dob: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated data to your backend
    console.log("Saved data:", userData);
  };

  const displayValue = (value) => {
    return value || "Not Specified";
  };

  return (
    <div className="account-settings-container">
      <h1 className="account-settings-title">Account Settings</h1>

      <div className="account-settings-table">
        <div className="table-row">
          <div className="table-header">Name</div>
          <div className="table-data">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              displayValue(userData.name)
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
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              displayValue(userData.phone)
            )}
          </div>
        </div>

        <div className="table-row">
          <div className="table-header">GSTIN</div>
          <div className="table-data">
            {isEditing ? (
              <input
                type="text"
                name="gstin"
                value={userData.gstin}
                onChange={handleInputChange}
                className="edit-input"
                placeholder="Enter GSTIN if applicable"
              />
            ) : (
              displayValue(userData.gstin)
            )}
          </div>
        </div>

        <div className="table-row">
          <div className="table-header">Company Name</div>
          <div className="table-data">
            {isEditing ? (
              <input
                type="text"
                name="companyName"
                value={userData.companyName}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              displayValue(userData.companyName)
            )}
          </div>
        </div>

        <div className="table-row">
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
        </div>

        <div className="table-row">
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
        </div>
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
