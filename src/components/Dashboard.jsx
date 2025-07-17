import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard"; // Make sure file name matches exactly
import "./AdminLogin.css";

const Dashboard = () => {
  const [form, setForm] = useState({ userId: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("adminLoggedIn") === "true");

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.userId === "admin" && form.password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      setIsLoggedIn(true);
    } else {
      alert("❌ Invalid Admin Credentials");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return isLoggedIn ? (
    <AdminDashboard />
  ) : (
    <div className="login-box">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          name="userId"
          placeholder="User ID"
          value={form.userId}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Dashboard;
