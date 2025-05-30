// CartContext
// Handles cart state globally — like adding, removing, and clearing cart items.
// Helps persist cart state across pages.

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = Cookies.get("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart), { expires: 1 });
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    Cookies.remove("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
