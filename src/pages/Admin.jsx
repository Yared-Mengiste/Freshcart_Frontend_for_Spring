import React, { useState, useEffect } from "react";
import ManageProducts from "./ManageProducts";
import Users from "./Users";
import "./admin.css";
import "./home.css";
import "./category.css";

const Admin = (props) => {
  const [onUsers, changeTo] = useState(true);


  return (
    <section className="admin-container">
      <div>
        <div className="button-group">
          <button
            type="button"
            className={`signin-btn ${onUsers ? "active" : "inactive"}`}
            onClick={() => changeTo(true)}
          >
            <p>Products</p>
          </button>
          <h1>|</h1>
          <button
            type="button"
            className={`signin-btn ${!onUsers ? "active" : "inactive"}`}
            onClick={() => changeTo(false)}
          >
            <p>Users</p>
          </button>
        </div>
        <div>
          {onUsers ? (
            <ManageProducts
              products={props.products}
              setProducts={props.setProducts}
            />
          ) : (
            <Users />
          )}
        </div>
      </div>
    </section>
  );
};

export default Admin;
