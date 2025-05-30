import React, { useState, useEffect } from "react";
import axios from "axios";
import "./delivery.css";

const UserOrders = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  return (
    <section>
      <div className="user-orders">
        <h2>Your Orders</h2>
        <h2>Its Being Worked On</h2>
      </div>
    </section>
  );
};

export default UserOrders;
