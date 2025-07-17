import React, { useEffect, useState } from "react";
import "./cities.css";
import { useNavigate } from "react-router-dom"; // ✅ Add this

const JodhpurPage = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate(); // ✅ Initialize

  useEffect(() => {
    fetch("/data/jodhpurData.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load Jodhpur data:", err));
  }, []);

  if (!data)
    return <p style={{ textAlign: "center", padding: "50px" }}>Loading Jodhpur information...</p>;

  const handleBooking = (type, name) => {
    navigate("/booking", { state: { city: "Jodhpur", [type]: name } });
  };

  return (
    <div className="city-page">
      <h1 className="city-heading">Explore Jodhpur</h1>

      {/* 🍽 Restaurants */}
      <section className="city-section">
        <h2>Top Restaurants</h2>
        <div className="city-grid">
          {data.restaurants.map((item, index) => (
            <div key={index} className="city-card">
              <img src={item.image} alt={item.name} className="city-img" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p><strong>Contact:</strong> {item.contact}</p>
              <p><strong>Price:</strong> {item.price}</p>
              <button
                className="book-btn"
                onClick={() => handleBooking("restaurant", item.name)}
              >
                Book Restaurant
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 🏰 Places */}
      <section className="city-section">
        <h2>Must-Visit Places</h2>
        <div className="city-grid">
          {data.places.map((place, index) => (
            <div key={index} className="city-card">
              <img src={place.image} alt={place.name} className="city-img" />
              <h3>{place.name}</h3>
              <p>{place.description}</p>
              <p><strong>Timing:</strong> {place.timing}</p>
              <p><strong>Entry:</strong> {place.entryFee}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🛌 Hotels */}
      <section className="city-section">
        <h2>Places to Stay</h2>
        <div className="city-grid">
          {data.hotels.map((hotel, index) => (
            <div key={index} className="city-card">
              <img src={hotel.image} alt={hotel.name} className="city-img" />
              <h3>{hotel.name}</h3>
              <p>{hotel.description}</p>
              <p><strong>Contact:</strong> {hotel.contact}</p>
              <p><strong>Price:</strong> {hotel.price}</p>
              <button
                className="book-btn"
                onClick={() => handleBooking("hotel", hotel.name)}
              >
                Book Hotel
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JodhpurPage;
