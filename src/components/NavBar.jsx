// NavBar component
// This shows the top navigation with links, profile dropdown, search bar, and the cart icon.
// Also handles logout and updating search term through context.

import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import axiosInstance from "../api/axiosInstance";
import Menu from "../assets/menu.png";
import "./NavBar.css";
import "./Search.css";
import SearchIcon from "../assets/search.png";
import Cart from "../assets/cart.png";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartProvider";
import { useUser } from "../context/UserContext";
import dayjs from 'dayjs'
import { useMessage } from "../context/MessageContext";

const toggleCart = () => {
  const cart = document.querySelector(".cart-container");
  cart.classList.toggle("cart-visible");
};

const NavBar = () => {
  const { setSearch } = useSearch();
  const { cart, removeFromCart, clearCart } = useCart();
  const { user, logout } = useUser();
  const { showMessage} = useMessage();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchText.trim().length > 0) {
      navigate("/products/search");
    } else {
      navigate("/");
    }
  }, [searchText]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSearchText(value);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sendToDB =  async (e) => {
    e.preventDefault();
    let ttPrice = cart.reduce(
                  (a, item) => a + item.price * item.quantity,
                  0
                )

  const orderPayload = {
    userId: user.id,
    totalPrice: ttPrice,
    status: "PROCESSING", 
    items: cart.map(item => ({
      productId: parseInt(item.id, 10),
      quantity: parseInt(item.quantity, 10),
      price: parseFloat(item.price)
    }))
  };
  console.log("Order Payload:", orderPayload);

  try {
    const response = await axiosInstance.post('/orders', orderPayload);
    console.log("Order placed:", response.data);
    if(response.data.id){
      clearCart()
      alert('Successful Bought')
      showMessage(`${ttPrice} Birr Order is placed', 'success`);
    }
    return response.data;
  } catch (error) {
    console.error("Failed to place order:", error.data.code);
    alert(error.data.code)
    showMessage('Failed to place order. Please try again.', 'error');
  }
};
  return (
    <section className="nav-section fixed top-0 left-0 z-50 w-full py-10 transition-all duration-500 max-lg:py-4">
      <header className="container flex h-14 items-center max-lg:px-5">
        <div className="nav-container">
          <div className="nav-logo">
            <a href="./App">
              <h1 className="logo cursor-pointer">Fresh Cart</h1>
            </a>
          </div>
          <div className="search-menu">
            <div className="search-container">
              <img src={SearchIcon} alt="search" className="icon search" />
              <input
                className="search-input"
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                value={searchText}
              />
            </div>

            <div className="menu-container">
              <img src={Menu} alt="menu" className="icon" />
              <nav>
                <ul>
                  <li>
                    <NavLink to="/">HOME</NavLink>
                  </li>
                  <li>
                    <NavLink to="/products">SHOP NOW</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">CONTACT</NavLink>
                  </li>
                  {user.id && user.accountType === 'ADMIN' && (
                    <li>
                      <NavLink to="/admin">ADMIN</NavLink>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
            {user.id ? (
              <div>
                <div className="profile-container">
                  <div className="profile">
                    <img
                      src="/images/apple.jpg"
                      alt="Profile"
                      className="profile-picture"
                    />
                    <span className="profile-name">{user.name}</span>
                  </div>
                  <div className="profile-dropdown">
                    <Link className="dropdown-item" to="/userProfile">
                      Edit Account
                    </Link>
                    <Link className="dropdown-item" to="/orders">
                      Orders
                    </Link>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="primary-btn">
                <Link to="/signin">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </header>
      {user.id && (
        <div>
          <img src={Cart} alt="" className="cart" onClick={toggleCart} />
          <div className="cart-container cart-visible">
            <div className="cart-name">
              <h3
                style={{
                  color: "var(--primary-color)",
                  backgroundColor: "var(--secondary-color)",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  padding: "20px",
                }}
              >
                Cart
              </h3>
              <p className="product-price">
                Total : $
                {cart.reduce(
                  (a, item) => a + item.price * item.quantity,
                  0
                )}
              </p>
            </div>
            <div className="cart-items">
              {cart.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    removeFromCart={removeFromCart}
                  />
                );
              })}
            </div>
            <div className="finalize-buy">
              <form action="" onSubmit={sendToDB}>
                <input
                  type="text"
                  placeholder="TeleBirr:0921431253"
                  pattern="09[0-9]{8}"
                  name="Telebirr"
                  required
                />
                <button
                  className="primary-btn"
                  type="submit"
                  style={{ width: "60%" }}
                >
                  Checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NavBar;