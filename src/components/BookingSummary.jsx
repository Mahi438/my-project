// src/components/BookingSummary.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingSummary.css";

const BookingSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p style={{ padding: "50px", textAlign: "center" }}>No booking details available.</p>;
  }

  return (
    <div className="summary-container">
      <h2 className="summary-heading">🎉 Booking Confirmed!</h2>

      <div className="summary-box">
        <p><strong>👤 Name:</strong> {state.name}</p>
        <p><strong>🏙 City:</strong> {state.city}</p>

        <hr />

        <p><strong>🏨 Hotel:</strong> {state.hotel}</p>
        <p><strong>👥 Hotel Guests:</strong> {state.hotelGuests}</p>

        <hr />

        <p><strong>🍽 Restaurant:</strong> {state.restaurant}</p>
        <p><strong>👥 Restaurant Guests:</strong> {state.restaurantGuests}</p>

        <hr />

        <p><strong>📅 Date:</strong> {state.startDate}</p>
        <p><strong>📧 Email:</strong> {state.email}</p>
        <p><strong>📞 Phone:</strong> {state.phone}</p>
      </div>

      <button className="home-button" onClick={() => navigate("/")}>
        Go to Home 🏠
      </button>
    </div>
  );
};

export default BookingSummary;