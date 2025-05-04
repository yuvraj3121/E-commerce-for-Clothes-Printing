import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="mern-navbar">
      <div className="mern-navbar-container">
        <Link to="/" className="mern-navbar-logo">Clothes Store</Link>
        <div className="mern-navbar-links">
          {user ? (
            <>
              <Link to="/dashboard" className="mern-navbar-link">Dashboard</Link>
              <button onClick={handleLogout} className="mern-navbar-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mern-navbar-link">Login</Link>
              <Link to="/signup" className="mern-navbar-link">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar