import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CiUser } from "react-icons/ci";
import { BsShopWindow } from "react-icons/bs";

const ChoicePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md flex flex-col items-center gap-3">
        <div
          className="h-[200px] w-[200px] bg-blue-100 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-blue-300 text-2xl gap-2"
          onClick={() => navigate("/")}
        >
          <CiUser className="text-4xl" />
          User
        </div>
        <div
          className="h-[200px] w-[200px] bg-blue-100 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-blue-300 text-2xl gap-2"
          onClick={() => navigate("/vendorHome")}
        >
          <BsShopWindow className="text-4xl" />
          Vendor Panel
        </div>
      </div>
    </div>
  );
};

export default ChoicePage;
