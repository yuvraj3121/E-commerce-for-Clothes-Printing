import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(formData.email, formData.password)
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="mern-login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="mern-login-form">
        <div className="mern-login-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mern-login-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="mern-login-submit-btn">
          Login
        </button>
      </form>
      <p className="mern-signup-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  )
}

export default Login