import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import { db } from "../FirebaseConfig"; // 🔁 Make sure the path is correct
import { collection, addDoc } from "firebase/firestore";

const booking = {
  Jaisalmer: {
    hotels: ["Suryagarh", "Fort Rajwada", "Desert Tulip Hotel", "Hotel Lalgarh Fort & Palace"],
    restaurants: ["The Trio", "Desert Boy’s Dhani", "Suryagarh Restaurant", "Free Tibet Restaurant"],
  },
  Jaipur: {
    hotels: ["Taj Rambagh Palace", "Hilton Hotel", "Umaid Bhawan Heritage House", "Alsisar Haveli"],
    restaurants: ["Handi Restaurant", "Spice Court", "RJ14", "Bar Palladio"],
  },
  Udaipur: {
    hotels: ["Taj Lake Palace", "The Oberoi Udaivilas", "Hotel Lakend", "Hotel Hilltop Palace"],
    restaurants: ["Ambrai Restaurant", "Upre by 1559 AD", "Natraj Dining Hall", "Jheel’s Rooftop Cafe"],
  },
  Jodhpur: {
    hotels: ["Umaid Bhawan Palace", "RAAS Hotel", "Ratan Vilas", "The Ajit Bhawan"],
    restaurants: ["Indique Restaurant", "Gypsy Dining Hall", "On The Rocks", "Stepwell Cafe"],
  },
};

const Booking = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    hotel: "",
    restaurant: "",
    email: "",
    phone: "",
    startDate: "",
    hotelGuests: "",
    restaurantGuests: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "hotelBookings"), {
        ...formData,
        timestamp: new Date(),
      });

      alert("✅ Booking saved in Firebase!");
      navigate("/booking-summary", { state: formData });

      // Clear form
      setFormData({
        name: "",
        city: "",
        hotel: "",
        restaurant: "",
        email: "",
        phone: "",
        startDate: "",
        hotelGuests: "",
        restaurantGuests: "",
      });
    } catch (error) {
      console.error("❌ Error saving booking:", error);
      alert("Error saving booking. Please try again.");
    }
  };

  return (
    <div className="booking-container">
      <h2>📑 Book Your Stay & Dining</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <label>👤 Full Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>🏙 Choose City:</label>
        <select name="city" value={formData.city} onChange={handleChange} required>
          <option value="">--Select City--</option>
          {Object.keys(booking).map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <label>🏨 Select Hotel:</label>
        <select
          name="hotel"
          value={formData.hotel}
          onChange={handleChange}
          required
          disabled={!formData.city}
        >
          <option value="">--Select Hotel--</option>
          {formData.city &&
            booking[formData.city].hotels.map((hotel) => (
              <option key={hotel} value={hotel}>{hotel}</option>
            ))}
        </select>

        <label>🍽 Select Restaurant:</label>
        <select
          name="restaurant"
          value={formData.restaurant}
          onChange={handleChange}
          required
          disabled={!formData.city}
        >
          <option value="">--Select Restaurant--</option>
          {formData.city &&
            booking[formData.city].restaurants.map((res) => (
              <option key={res} value={res}>{res}</option>
            ))}
        </select>

        <label>📧 Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>📱 Phone Number:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>📅 Start Date:</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

        <label>🏨 Hotel Booking For (Guests):</label>
        <input type="number" name="hotelGuests" value={formData.hotelGuests} onChange={handleChange} required min="1" />

        <label>🍽 Restaurant Booking For (Guests):</label>
        <input type="number" name="restaurantGuests" value={formData.restaurantGuests} onChange={handleChange} required min="1" />

        <button type="submit">✅ Confirm Booking</button>
      </form>
    </div>
  );
};

export default Booking;
