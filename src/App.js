import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ExploreCities from "./components/ExploreCities";
import Footer from "./components/Footer";

// City Pages
import JaipurPage from "./components/cities/JaipurPage";
import UdaipurPage from "./components/cities/UdaipurPage";
import JodhpurPage from "./components/cities/JodhpurPage";
import JaisalmerPage from "./components/cities/JaisalmerPage";

// Other Pages
import About from "./components/About";
import Contact from "./components/Contact";
import Plan from "./components/Plan";
import Booking from "./components/Booking";
import BookingSummary from "./components/BookingSummary";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/LoginSignup"; // Login + Signup component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* ✅ Home Page */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <ExploreCities />
              <Footer />
            </>
          }
        />

        {/* ✅ City Pages */}
        <Route path="/jaipur" element={<JaipurPage />} />
        <Route path="/udaipur" element={<UdaipurPage />} />
        <Route path="/jodhpur" element={<JodhpurPage />} />
        <Route path="/jaisalmer" element={<JaisalmerPage />} />

        {/* ✅ Navbar Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-summary" element={<BookingSummary />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* ✅ Login Page */}
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;
