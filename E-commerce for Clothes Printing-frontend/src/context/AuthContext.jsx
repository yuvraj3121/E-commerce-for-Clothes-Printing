import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get(
            "http://localhost:8000/api/user/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(res.data.user);

          // console.log(res.data);
        }
      } catch (err) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:8000/api/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      if (res.data.user.role === "admin") {
        navigate("/adminHome");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const signup = async (userName, fullName, email, password, phoneNumber) => {
    await axios.post("http://localhost:8000/api/user/signup", {
      userName,
      fullName,
      email,
      password,
      phoneNumber,
    });
    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const updateProfile = async (userData) => {
    const token = localStorage.getItem("token");
    // console.log(token);
    const res = await axios.patch(
      "http://localhost:8000/api/user/updateProfile",

      {
        userName: userData.userName,
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: userData.password || "",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setUser(res.data.user);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, updateProfile }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
