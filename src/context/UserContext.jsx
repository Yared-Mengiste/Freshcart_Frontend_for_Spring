// UserContext
// Stores current logged-in user and login state globally.
// Used by pages/components to access user info and check if someone is logged in.

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = Cookies.get("user");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    Cookies.set("user", JSON.stringify(user), { expires: 7 }); 
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser({});
    Cookies.remove("user");
    Cookies.remove("cart");
  };

  return (
    <UserContext.Provider value={{ user,setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
