import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const BASE_URL = "http://localhost:8081/api/products";

  // Fetch products on load
  useEffect(() => {
    axios.get(BASE_URL)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  // Add product
  const addProduct = async (productData) => {
    try {
      const res = await axios.post(BASE_URL, productData);
      setProducts(prev => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  // Remove product
  const removeProduct = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  // Update product
  const updateProduct = async (id, updatedProduct) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, updatedProduct);
      setProducts(prev =>
        prev.map((p) => (p.id === id ? res.data : p))
      );
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, removeProduct, updateProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
