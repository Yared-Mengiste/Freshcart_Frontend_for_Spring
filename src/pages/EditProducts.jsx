import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductsProvider";
import "../components/product.css";
import showObserver from "../animation";

const EditProducts = ({ id, name, price, img }) => {
  const [newPrice, setNewPrice] = useState(price);
  const { updateProduct } = useProducts(); // from context

  // Update local input field when price prop changes
  useEffect(() => {
    setNewPrice(price);
  }, [price]);
  useEffect(() => {
    showObserver();
  }, []);

  const updatePrice = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, parseFloat(newPrice));
      alert("Price updated successfully!");
    } catch (error) {
      console.error("Failed to update price", error);
      alert("Failed to update price.");
    }
  };

  return (
    <div className="relation-container">
      <div className="product-card">
        <img
          src={`/images/${img}`}
          alt={name}
          className="product-image"
        />
        <div className="description">
          <div>
            <h3 className="product-name">{name}</h3>
            <p className="product-price">${price} / kg</p>
          </div>
          <form onSubmit={updatePrice}>
            <input
              type="number"
              min="0"
              step="0.05"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="New price"
              style={{ marginLeft: "50px",width: "70%", marginTop: "10px" }}
              required
            />
            <button type="submit" className="primary-btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
