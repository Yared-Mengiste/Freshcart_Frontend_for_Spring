// UserContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
  const saved = Cookies.get("user");
  try {
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error("Failed to parse user cookie:", error);
    Cookies.remove("user"); // Optional: clear bad cookie
    return {};
  }
});


  const [token, setToken] = useState(() => {
    return Cookies.get("token") || "";
  });

  useEffect(() => {
    Cookies.set("user", JSON.stringify(user), { expires: 1 });
  }, [user]);

  useEffect(() => {
    Cookies.set("token", token, { expires: 1 });
  }, [token]);

  const login = ({ user, token }) => {
    console.log("User logged in:", user);
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    setUser({});
    setToken("");
    Cookies.remove("user");
    Cookies.remove("token");
    Cookies.remove("cart");
  };

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
