import React, { useState, useEffect } from "react";
import {Outlet} from 'react-router'
import ManageProducts from "./ManageProducts";
import Users from "./Users";
import "./admin.css";
import "./home.css";
import "./category.css";
import { useNavigate } from 'react-router-dom'
import { on } from "ws";

const Admin = () => {
  const [onUsers, changeTo] = useState('Products');
  const navigate = useNavigate();



  return (
    <section className="admin-container">
      <div>
        <div className="button-group">
          <button
            type="button"
            className={`signin-btn ${onUsers === 'Products' ? "active" : "inactive"}`}
            onClick={() => {changeTo('Products'); navigate('/admin/products');} }
          >
            <p>Products</p>
          </button>
          <h1>|</h1>
          <button
            type="button"
            className={`signin-btn ${onUsers ==='Users' ? "active" : "inactive"}`}
            onClick={() => { changeTo('Users'); navigate('/admin/users'); }}
          >
            <p>Users</p>
          </button>
          <h1>|</h1>
          <button
            type="button"
            className={`signin-btn ${onUsers ==='Orders' ? "active" : "inactive"}`}
            onClick={() => { changeTo('Orders'); navigate('/admin/orders'); }}
          >
            <p>Orders</p>
          </button>
        </div>
        <div>
         <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Admin;
