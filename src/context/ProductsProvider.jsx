import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  // 🟡 Fetch on initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Add product
  const addProduct = async (productData) => {
    try {
      await axiosInstance.post('/products', productData);
      await fetchProducts(); // 🔁 Refresh after add
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  // ✅ Remove product
  const removeProduct = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      await fetchProducts(); // 🔁 Refresh after delete
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  // ✅ Update product
  const updateProduct = async (id, updatedProduct) => {
    console.log("Updating product:", updatedProduct);
    try {
      const res = await axiosInstance.put(`/products/${id}`, updatedProduct);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p))
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
