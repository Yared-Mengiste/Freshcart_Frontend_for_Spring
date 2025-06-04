// src/pages/Category.jsx
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import "./category.css";
import showObserver from "../animation";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartProvider";
import { useUser } from "../context/UserContext";
import { useProducts } from "../context/ProductsProvider";

const CATEGORY_MAP = {
  fruits: { id: 2, title: "Fruits" },
  vegetables: { id: 1, title: "Vegetables" },
  cereals: { id: 3, title: "Cereals and Grains" },
  animals: { id: 4, title: "Animal Products" },
};

const Category = () => {
  const { type } = useParams();
  const { search } = useSearch();
  const { addToCart } = useCart();
  const { user } = useUser();
  const login = !!user.id;
  const {products} = useProducts();
  const allProducts = products;

  const { id: categoryId, title } = CATEGORY_MAP[type] || {};

  const productsM = useMemo(() => {
    if (search) {
      return allProducts.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (!categoryId) return [];
    return allProducts.filter((p) => p.categoryId === categoryId);
  }, [search, categoryId, allProducts]);

  useEffect(() => {
    showObserver();
  }, []);

  if (!CATEGORY_MAP[type] && !search) return <h1>Category Not Found</h1>;

  return (
    <section>
      <h2 id="category-name">{search ? "Search Results" : title}</h2>
      <div className="category-products">
        {productsM.map((product) => (
          <div className="hidden-sec" key={product.id}>
            <Product
              id={product.id}
              img={product.img}
              name={product.name}
              price={product.price}
              login={login}
              addToCart={addToCart}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;