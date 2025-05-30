import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./footer.css";
import { useUser } from "../context/UserContext";

const Footer = () => {
  const { user } = useUser();
  const isLoggedIn = !!user.id;

  return (
    <footer className="footer1">
      <div className="container">
        <div className="col1">
          <Link to="/" className="brand">
            FreshCart
          </Link>
          <ul className="media-icons">
            <li>
              <a href="#" aria-label="Facebook">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#" aria-label="Twitter">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#" aria-label="Instagram">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#" aria-label="LinkedIn">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </li>
          </ul>
        </div>
        
        <div className="col2">
          <ul className="menu">
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/products">SHOP NOW</NavLink>
            </li>
            <li>
              <NavLink to="/contact">CONTACT</NavLink>
            </li>
          </ul>
          <p className="text-justify">
            Skip the hassle of grocery shopping and have fresh, high-quality
            items delivered directly to your door. Save time and energy with
            just a few clicks, no need to leave home!
          </p>
        </div>
        <div className="col3">
          <p>Subscribe to our news letter!</p>
          <form>
            <div className="input-wrap">
              <input 
                type="email" 
                placeholder="example@gmail.com" 
                aria-label="Email for newsletter subscription"
              />
              <Link to={isLoggedIn ? '/products' : '/signin'} aria-label="Subscribe">
                <ion-icon name="paper-plane-outline"></ion-icon>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;