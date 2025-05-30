import React, { useState, useEffect } from "react";
import axios from "axios";
import showObserver from "../animation";
import EditProducts from "./EditProducts";
import "./admin.css";
import "./home.css";
import "./category.css";

const ManageProducts = (props) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "2",
    price: "",
    img: "",
  });
  const [allProducts, setProducts] = useState(props.products);
  const [search, setSearch] = useState("");
  useEffect(() => {
    showObserver();
    setProducts(
      props.products.filter((product) => product.name.includes(search))
    );
  }, [search]);
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const createProduct = async (e) => {
    e.preventDefault()
    alert("Product added successfully")
  }
  

  return (
    <section>
      <div>
        <form className="new-product" onSubmit={createProduct}>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            placeholder="name"
            required
          />
          <input
            type="number"
            name="price"
            min={0}
            value={newProduct.price}
            onChange={handleChange}
            placeholder="price"
            required
          />
          <select
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            required
          >
            <option value='2'>Fruit</option>
            <option value='1'>vegetable</option>
            <option value='3'>Cereal Grain</option>
            <option value="4">Animal Products</option>
          </select>
          <input
            type="text"
            name="img"
            value={newProduct.img}
            onChange={handleChange}
            placeholder="image"
            required
          />
          <button className="primary-btn" type="submit">
            Add
          </button>
        </form>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <h2 id="category-name">Products</h2>
        <input
          style={{ alignSelf: "center" }}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search..."
        />
      </div>

      <div className="category-products">
        {allProducts.map((product) => {
          return (
            <div key={product.id} className="hidden-sec">
              <EditProducts
                id={product.id}
                img={product.img}
                name={product.name}
                price={product.price}
                products={props.products}
                setProducts={props.setProducts}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ManageProducts;
