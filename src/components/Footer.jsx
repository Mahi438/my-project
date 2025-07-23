import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-pro">
      <div className="footer-inner">
        <p>
          © {currentYear} Rajasthan Tourism. All rights reserved. | Crafted with
          <span className="footer-heart">♥</span> to celebrate royal heritage and vibrant culture.
        </p>
      </div>
    </footer>
  );
};

export default Footer;