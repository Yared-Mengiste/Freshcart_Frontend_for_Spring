import React, { useState, useEffect } from "react";
import showObserver from "../animation";
import EditProducts from "./EditProducts";
import "./admin.css";
import "./home.css";
import "./category.css";
import { useProducts } from "../context/ProductsProvider";

const ManageProducts = () => {
  const { products, addProduct } = useProducts(); // ✅ use context
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "2",
    price: "",
    img: "",
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    showObserver();
  }, []);

  useEffect(() => {
    if(!products)
      return 
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(result);
  }, [search, products]);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        ...newProduct,
        price: parseFloat(newProduct.price),
      });
      alert("Product added successfully");
      setNewProduct({
        name: "",
        category: "2",
        price: "",
        img: "",
      });
    } catch (err) {
      console.error("Failed to add product", err);
      alert("Failed to add product");
    }
  };

  return (
    <section>
      {console.log(products)}
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
            step={0.05}
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
            <option value="2">Fruit</option>
            <option value="1">Vegetable</option>
            <option value="3">Cereal Grain</option>
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
        {filteredProducts.map((product) => (
          <div key={product.id} className="hidden-sec">
            <EditProducts
              id={product.id}
              img={product.img}
              name={product.name}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageProducts;
