import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Fetch products on load
  useEffect(() => {
    axiosInstance.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  // Add product
  const addProduct = async (productData) => {
    console.log(productData)
    try {
      const res = await axiosInstance.post('/products', productData);
      setProducts(prev => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  // Remove product
  const removeProduct = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  // Update product
  const updateProduct = async (id, price) => {
    try {
      const updatedProduct = products.find((item)=> id == item.id)
      const res = await axiosInstance.put(`/products/${id}`, {...updatedProduct, price: price});
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
