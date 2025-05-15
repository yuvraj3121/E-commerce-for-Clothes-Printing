import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./AccountSettings.css";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";

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
      alert(error.response?.data?.message || "update failed");
      console.log(error);
    }
    setIsEditing(false);
    console.log("Saved data:", userData);
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    try {
      setPasswordChange(!passwordChange);
      alert("Password Updated Successfully.");
    } catch (error) {
      alert(error.response?.data?.message || "Password update failed");
      console.log(error);
    }
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
      <h1 className="account-settings-title">Account Details</h1>

      <div>
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
      <div className="passwordDiv">
        <button onClick={() => setPasswordChange(!passwordChange)}>
          {passwordChange === false ? (
            <div>
              <RiLockPasswordFill />
              Change Password
            </div>
          ) : (
            <div>Cancel</div>
          )}
        </button>
        {passwordChange && (
          <div>
            <label htmlFor="">Current Password:</label>
            <input
              type="text"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <label htmlFor="">New Password</label>
            <input
              type="text"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handlePasswordSave}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
