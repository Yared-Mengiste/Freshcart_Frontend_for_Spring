import React, { useState, useEffect } from "react";
import showObserver from "../animation";
import EditProducts from "./EditProducts";
import "./admin.css";
import "./home.css";
import "./category.css";
import { useProducts } from "../context/ProductsProvider";
import { useMessage } from "../context/MessageContext";

const ManageProducts = () => {
  const categoryMap = {
    1: "vegetable",
    2: "fruit",
    3: "cereal and grain",
    4: "animal product",
  };

  const { products, addProduct, updateProduct } = useProducts();
  const { showMessage } = useMessage();

  const [newProduct, setNewProduct] = useState({
    id: null,
    name: "",
    categoryId: "2",
    price: "",
    img: "",
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    showObserver();
  }, []);

  useEffect(() => {
    if (!products) return;
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const categoryId = parseInt(newProduct.categoryId);
      await addProduct({
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: null,
        categoryId,
        categoryName: categoryMap[categoryId],
      });
      showMessage(`${newProduct.name} added to database`, "success");
      resetForm();
    } catch (err) {
      showMessage("Failed to add product", "error");
      console.error("Failed to add product:", err);
    }
  };

  const updateExistingProduct = async () => {
    try {
      const categoryId = parseInt(newProduct.categoryId);
      await updateProduct(newProduct.id, {
        ...newProduct,
        price: parseFloat(newProduct.price),
        categoryId,
        categoryName: categoryMap[categoryId],
      });
      showMessage(`${newProduct.name} updated successfully`, "success");
      resetForm();
    } catch (err) {
      showMessage("Failed to update product", "error");
      console.error("Update error:", err);
    }
  };

  const resetForm = () => {
    setNewProduct({
      id: null,
      name: "",
      categoryId: "2",
      price: "",
      img: "",
    });
  };

  const transferData = (e) => {
    const productId = e.currentTarget.id;
    const product = products.find((item) => item.id === parseInt(productId));
    if (product) {
      setNewProduct({
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        categoryId: product.categoryId.toString(),
      });
    }
  };

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
            step={0.05}
            value={newProduct.price}
            onChange={handleChange}
            placeholder="price"
            required
          />
          <select
            name="categoryId"
            value={newProduct.categoryId}
            onChange={handleChange}
            required
          >
            <option value="1">Vegetable</option>
            <option value="2">Fruit</option>
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

          {newProduct.id === null ? (
            <button className="primary-btn" type="submit">
              Add
            </button>
          ) : (
            <>
              <button
                className="primary-btn"
                type="button"
                onClick={updateExistingProduct}
              >
                Update
              </button>
              <button
                className="secondary-btn"
                type="button"
                onClick={resetForm}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </>
          )}
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
          <div
            key={product.id}
            id={product.id}
            onClick={transferData}
            className="hidden-sec"
          >
            <EditProducts
              id={product.id}
              img={product.img}
              name={product.name}
              price={product.price}
              categoryId={product.categoryId}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageProducts;
