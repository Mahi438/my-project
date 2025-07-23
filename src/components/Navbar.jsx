// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import "../App.css";
import logo from "../assets/logo.png";
import defaultProfile from "../assets/default-profile.png"; // ✅ Default image

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo-img" />
        <span className="logo-text"> Royal Rajasthan</span>
      </div>

      <ul className="navbar-right">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/plan">Plan a Trip</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/booking">Booking</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>

        {user ? (
          <>
            <li>
              <img
                src={user.photoURL || defaultProfile}
                alt="User"
                className="profile-image"
              />
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
