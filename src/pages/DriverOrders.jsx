import React, { useState, useEffect } from "react";
import "./delivery.css";
import axiosInstance from "../api/axiosInstance";
import { useMessage } from "../context/MessageContext";

const DriverOrders = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderItemsCache, setOrderItemsCache] = useState({});
  const { showMessage } = useMessage();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`/deliveries`);
        setDeliveries(response.data);
      } catch (err) {
        console.error("Error fetching deliveries:", err);
        setError("Failed to fetch deliveries. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = async (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
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

  const handleMarkAsDelivered = (orderId) => {
    setDeliveries((prev) => prev.filter((order) => order.orderId !== orderId));
    setExpandedOrderId(null); // Collapse the details view
    showMessage(`Order ${orderId} marked as delivered`);
  };

  if (loading) return <div>Loading deliveries...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section style={{ marginTop: "150px" }}>
      <div className="user-orders">
        <h2>Undelivered Orders</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>User ID</th>
              <th>Order ID</th>
              <th>User Name</th>
              <th>User Phone</th>
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
                  <td className="toggle-icon">
                    {expandedOrderId === delivery.orderId ? "−" : "+"}
                  </td>
                  <td>{delivery.userId}</td>
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
                    <td colSpan="9">
                      {orderItemsCache[delivery.orderId]?.length > 0 ? (
                        <>
                          <ul>
                            <li>
                              <strong>Product Name</strong>{" "}
                              <strong>Price</strong>
                            </li>
                            {orderItemsCache[delivery.orderId].map((item, index) => (
                              <li key={index}>
                                <strong>{item.productName}</strong> –{" "}
                                {item.quantity} Kg × {item.price} ={" "}
                                {(item.quantity * item.price).toFixed(2)}
                              </li>
                            ))}
                          </ul>
                          <button
                            className="deliver-button"
                            onClick={() => handleMarkAsDelivered(delivery.orderId)}
                          >
                            Mark as Delivered
                          </button>
                        </>
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
        {deliveries.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No undelivered orders remaining.
          </p>
        )}
      </div>
    </section>
  );
};

export default DriverOrders;
