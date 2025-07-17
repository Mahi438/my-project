import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

import hawaMahal from "../assets/hawa-mahal.jpg";
import camel from "../assets/camel.jpg";
import fort from "../assets/fort.jpg";
import river from "../assets/river.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const cities = [
    { name: "Jaipur", path: "/jaipur" },
    { name: "Udaipur", path: "/udaipur" },
    { name: "Jodhpur", path: "/jodhpur" },
    { name: "Jaisalmer", path: "/jaisalmer" }
  ];

  const handleScroll = () => {
    const section = document.getElementById("explore-cities");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchClick = () => {
    const match = cities.find(city =>
      city.name.toLowerCase() === searchText.trim().toLowerCase()
    );
    if (match) {
      navigate(match.path);
    } else {
      alert("City not found!");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  };

  const filteredSuggestions = cities.filter(city =>
    city.name.toLowerCase().includes(searchText.toLowerCase()) &&
    searchText.trim() !== ""
  );

  const images = [hawaMahal, camel, fort, river];

  return (
    <div className="hero-slider-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="hero-slide-wrapper">
            <img
              src={img}
              alt={`slide-${index}`}
              className="hero-slide-img"
            />
          </div>
        ))}
      </Slider>

      {/* Overlay fixed on top */}
      <div className="hero-overlay">
        <div className="hero-search-box">
          <input
            type="text"
            className="hero-search"
            placeholder="Search cities..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setShowSuggestions(true);
            }}
          />
          <button className="search-btn" onClick={handleSearchClick}>
            Search
          </button>

          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="search-suggestions">
              {filteredSuggestions.map((city, index) => (
                <li
                  key={index}
                  onClick={() => {
                    navigate(city.path);
                    setSearchText("");
                    setShowSuggestions(false);
                  }}
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <h1>Welcome to Royal Rajasthan</h1>
        <button className="hero-btn" onClick={handleScroll}>
          Explore Cities
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
