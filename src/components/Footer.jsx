import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-pro">
      <div className="footer-inner">
        <p>
          © {currentYear} StayEase Hotel Management System. All rights reserved. | Built with
          <span className="footer-heart">♥</span>
          for exceptional hospitality experience
        </p>
      </div>
    </footer>
  );
};

export default Footer;