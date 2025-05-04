import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './Signup.css'

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    mobileNumber: ''
  })
  const { signup } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signup(
        formData.username,
        formData.fullName,
        formData.email,
        formData.password,
        formData.mobileNumber
      )
      alert('Signup successful! Please login.')
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="mern-signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="mern-signup-form">
        <div className="mern-signup-form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mern-signup-form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mern-signup-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mern-signup-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mern-signup-form-group">
          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="mern-signup-submit-btn">
          Sign Up
        </button>
      </form>
      <p className="mern-login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  )
}

export default Signup