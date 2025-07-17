import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const cities = [
  { name: "Jaipur", image: "jaipur.jpg", path: "/jaipur" },
  { name: "Udaipur", image: "udaipur.jpg", path: "/udaipur" },
  { name: "Jodhpur", image: "jodhpur.jpg", path: "/jodhpur" },
  { name: "Jaisalmer", image: "jaisalmer.jpg", path: "/jaisalmer" }
];

const ExploreCities = () => {
  const navigate = useNavigate();

  return (
    <div id="explore-cities" className="cities-section">
      <h2>Explore Rajasthan Cities</h2>

      <div className="city-grid">
        {cities.map((city, index) => (
          <div className="city-card" key={index}>
            <img
              src={require(`../assets/${city.image}`)}
              alt={city.name}
              className="city-img"
            />
            <h3>{city.name}</h3>
            <button
              className="city-btn"
              onClick={() => navigate(city.path)}
            >
              Explore Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCities;
