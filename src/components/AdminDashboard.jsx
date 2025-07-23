import React, { useEffect, useState } from "react";
import { db } from "../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./AdminDashboard.css"; // ✅ Add this CSS file

const AdminDashboard = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [planTrips, setPlanTrips] = useState([]);
  const [showHotelDetails, setShowHotelDetails] = useState(false);
  const [showTripDetails, setShowTripDetails] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const hotelSnapshot = await getDocs(collection(db, "hotelBookings"));
      setHotelBookings(hotelSnapshot.docs.map((doc) => doc.data()));

      const planSnapshot = await getDocs(collection(db, "planTrip"));
      setPlanTrips(planSnapshot.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    window.location.reload();
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>👨‍💻 Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="summary-cards">
        <div className="card" onClick={() => setShowHotelDetails(!showHotelDetails)}>
          <h2>🏨 Hotel Bookings</h2>
          <p>{hotelBookings.length} total</p>
        </div>

        <div className="card" onClick={() => setShowTripDetails(!showTripDetails)}>
          <h2>🚌 Travel Bookings</h2>
          <p>{planTrips.length} total</p>
        </div>
      </div>

      {/* Hotel Booking Table */}
      {showHotelDetails && (
        <div className="table-section">
          <h3>Hotel & Restaurant Bookings</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th><th>City</th><th>Hotel</th><th>Restaurant</th>
                <th>Email</th><th>Phone</th><th>Start Date</th>
                <th>Hotel Guests</th><th>Restaurant Guests</th>
              </tr>
            </thead>
            <tbody>
              {hotelBookings.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.city}</td>
                  <td>{item.hotel}</td>
                  <td>{item.restaurant}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.startDate}</td>
                  <td>{item.hotelGuests}</td>
                  <td>{item.restaurantGuests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Trip Table */}
      {showTripDetails && (
        <div className="table-section">
          <h3>Travel Plan Bookings</h3>
          <table>
            <thead>
              <tr>
                <th>From</th><th>To</th><th>Mode</th><th>Travel</th>
                <th>Date</th><th>Passengers</th><th>Mobile</th>
                <th>Per Person</th><th>Total</th>
              </tr>
            </thead>
            <tbody>
              {planTrips.map((trip, index) => (
                <tr key={index}>
                  <td>{trip.from}</td>
                  <td>{trip.to}</td>
                  <td>{trip.mode}</td>
                  <td>{trip.travelName}</td>
                  <td>{trip.date}</td>
                  <td>{trip.passengers}</td>
                  <td>{trip.mobile}</td>
                  <td>₹{trip.perPerson}</td>
                  <td>₹{trip.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
