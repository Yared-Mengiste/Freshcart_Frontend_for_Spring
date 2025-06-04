// Product listing page
// Shows products based on category or search results.
// Pulls from local data.json and uses filters/search term.

import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import showObserver from "../animation";
import "./products.css";
import { useCart } from "../context/CartProvider";
import { useUser } from "../context/UserContext";
import { useProducts } from "../context/ProductsProvider";

const Products = () => {
  const { addToCart } = useCart();
  const { user } = useUser();
  const login = !!user.id;
  const { products } = useProducts();

  // Use state for each category
  const [vegetables, setVegetables] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [cereals, setCereals] = useState([]);
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    showObserver();
  }, []);

  useEffect(() => {
    if (!Array.isArray(products) || products.length === 0) {
      setVegetables([]);
      setFruits([]);
      setCereals([]);
      setAnimals([]);
      return;
    }
    setVegetables(products.filter((p) => p.categoryId === 1).slice(0, 4));
    setFruits(products.filter((p) => p.categoryId === 2).slice(0, 4));
    setCereals(products.filter((p) => p.categoryId === 3).slice(0, 4));
    setAnimals(products.filter((p) => p.categoryId === 4).slice(0, 4));
    console.log("Products loaded:", products);
  }, [products]);

  return (
    <section>
      <div className="product-container">
        {/* vegetables */}
        <div className="category hidden-sec">
          <div className="category-name">
            <h3>Vegetables</h3>
            <Link to="/products/vegetables">Show More {">>"}</Link>
          </div>
          <div className="category-items">
            {vegetables.map((item) => (
              <Product
                key={item.id}
                {...item}
                login={login}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>

        {/* fruits */}
        <div className="category hidden-sec">
          <div className="category-name">
            <h3>Fruits</h3>
            <Link to="/products/fruits">Show More {">>"}</Link>
          </div>
          <div className="category-items">
            {fruits.map((item) => (
              <Product
                key={item.id}
                {...item}
                login={login}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>

        {/* cereals */}
        <div className="category hidden-sec">
          <div className="category-name">
            <h3>Cereals and Grains</h3>
            <Link to="/products/cereals">Show More {">>"}</Link>
          </div>
          <div className="category-items">
            {cereals.map((item) => (
              <Product
                key={item.id}
                {...item}
                login={login}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>

        {/* Animal products */}
        <div className="category hidden-sec">
          <div className="category-name">
            <h3>Animal Products</h3>
            <Link to="/products/animals">Show More {">>"}</Link>
          </div>
          <div className="category-items">
            {animals.map((item) => (
              <Product
                key={item.id}
                {...item}
                login={login}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;