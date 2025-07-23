import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

import hawaMahal from "../assets/hawa-mahal.jpg";
import camel from "../assets/camel.jpg";
import fort from "../assets/fort.jpg";
import river from "../assets/river.jpg";

const HeroSection = () => {
 

  const handleScroll = () => {
    const section = document.getElementById("explore-cities");
    if (section) section.scrollIntoView({ behavior: "smooth" });
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
