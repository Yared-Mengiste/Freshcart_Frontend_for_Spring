import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductsProvider";
import "../components/product.css";
import Delete from "../assets/deleteProduct.png";
import { useMessage } from "../context/MessageContext";
import showObserver from "../animation";

const EditProducts = ({ id, name, price, img }) => {
  const [newPrice, setNewPrice] = useState(price);
  const { updateProduct, removeProduct } = useProducts();
  const {showMessage} = useMessage();
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await removeProduct(id);
        showMessage(`${name} Removed from Database`, "success");
      } catch (error) {
        console.error("Failed to delete product", error);
        showMessage( `Failed to delete ${name}` , "error");
      }
    }
  };
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
      showMessage(`${name} Price Updated`, "success");
    } catch (error) {
      console.error("Failed to update price", error);
      showMessage(`Failed to update ${name} Price`, "error");
    }
  };

  return (
    <div className="relation-container">
      <div className="product-card">
  <div className="image-wrapper">
    <img
      src={`/images/${img}`}
      alt={name}
      className="product-image"
    />
    <button
      type="button"
      className="delete-btn icons"
      onClick={handleDelete}
    >
      <img src={Delete} alt="Delete"  />
    </button>
  </div>
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
        style={{ marginLeft: "auto", width: "70%", marginTop: "10px" }}
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
