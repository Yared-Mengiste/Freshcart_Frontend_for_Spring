// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import AccountForm from "./pages/AccountForm";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Category from "./pages/Category";
import ContactForm from "./pages/ContactForm";
import UserProfile from "./pages/UserProfile";
import UserOrders from "./pages/Delivery"; // Renamed to be more descriptive
import Admin from "./pages/Admin";
import ManageProducts from "./pages/ManageProducts";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import data from "../src/json/data.json";
import { CartProvider } from "./context/CartProvider";
import { UserProvider } from "./context/UserContext";
import { SearchProvider } from "./context/SearchContext";
import { useProducts } from "./context/ProductsProvider";
import PaymentReturn from "./pages/PaymentReturn";
import DriverOrders from "./pages/DriverOrders";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { products: productsProvided } = useProducts();

  useEffect(() => {
    setLoading(false);
    setProducts(productsProvided);
    console.log("Products loaded:", productsProvided);
  }, [productsProvided]);
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <NavBar />
      <div>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/products/:type" element={<Category />} />
          <Route
            path="/products/search"
            element={<Category title="Search" />}
          />
          <Route path="/signin" element={<AccountForm />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/admin" element={<Admin />}>
            <Route index element={<ManageProducts />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/deliveries" element={<DriverOrders />} />
          <Route path="/payment-success" element={<PaymentReturn />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
