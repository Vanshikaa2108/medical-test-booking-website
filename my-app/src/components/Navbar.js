import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/index.css"; 
import "../Styles/navbar.css";
import Image2 from "../image/logo.png";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
    }

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar-menu") && !event.target.closest(".hamburger")) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="container2">
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>
        {/* Logo */}
        <div className="logo">
          <img src={Image2} alt="Dr.PathLab Logo" />
        </div>

        {/* Navigation Menu */}
        <nav className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/book-test" onClick={() => setMenuOpen(false)}>Book a Test</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
            <li><Link to="/doctor" onClick={() => setMenuOpen(false)}>Doctor</Link></li>
            <li><Link to="/knowledge-center" onClick={() => setMenuOpen(false)}>Knowledge Center</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
            <li><Link to="/ai" onClick={() => setMenuOpen(false)}>Ai</Link></li>

          </ul>
        </nav>

        {/* Contact Button */}
       

        {/* Hamburger Menu */}
        
      <div className="contact-btn">
          {isLoggedIn ? (
            <Link to="/dashboard">Account</Link>
          ) : (
            <Link to="/register">Login/SignUp</Link>
          )}
        </div>
        </div>

    </header>
  );
}
