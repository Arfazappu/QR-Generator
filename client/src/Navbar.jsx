import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="nav-bar">
      <Link to="/" className="nav-button">
        QR Code Generator
      </Link>
      <Link to="/verify" className="nav-button">
        QR Verify
      </Link>
    </div>
  );
};

export default Navbar;
