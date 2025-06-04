import React, { useState, useEffect } from "react";
import "./delivery.css";
import { useUser } from "../context/UserContext";
import axiosInstance from "../api/axiosInstance";

const UserOrders = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderItemsCache, setOrderItemsCache] = useState({});
  const { user } = useUser();

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axiosInstance.get(`/deliveries/${user.id}`);
        setDeliveries(response.data);
      } catch (err) {
        console.error("Error fetching deliveries:", err);
        setError("Failed to fetch deliveries. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, [user.id]);

  const toggleOrderDetails = async (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null); // collapse
    } else {
      setExpandedOrderId(orderId); // expand
      if (!orderItemsCache[orderId]) {
        try {
          const response = await axiosInstance.get(`/items/${orderId}`);
          setOrderItemsCache((prev) => ({
            ...prev,
            [orderId]: response.data,
          }));
        } catch (err) {
          console.error("Failed to fetch order items:", err);
        }
      }
    }
  };

  if (loading) return <div>Loading deliveries...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section>
      <div className="user-orders">
        <h2>Your Deliveries</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Driver Name</th>
              <th>Driver Phone</th>
              <th>Shop Name</th>
              <th>Total Price</th>
              <th>Ordered At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <React.Fragment key={delivery.orderId}>
                <tr
                  onClick={() => toggleOrderDetails(delivery.orderId)}
                  className="clickable-row"
                >
                  <td>{delivery.orderId}</td>
                  <td>{delivery.driverName}</td>
                  <td>{delivery.driverPhone}</td>
                  <td>{delivery.shopName}</td>
                  <td>{delivery.totalPrice}</td>
                  <td>{new Date(delivery.createdAt).toLocaleString()}</td>
                  <td>{delivery.status}</td>
                </tr>
                {expandedOrderId === delivery.orderId && (
                  <tr className="order-items-row">
                    <td colSpan="7">
                      {orderItemsCache[delivery.orderId]?.length > 0 ? (
                        <ul>
                          <li><strong>Product Name</strong> <strong>Price</strong></li>
                          {orderItemsCache[delivery.orderId].map((item, index) => (
                            <li key={index}>
                              <strong>{item.productName}</strong> – {item.quantity} Kg × {item.price} ={" "}
                              {(item.quantity * item.price).toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div>No items found.</div>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserOrders;
