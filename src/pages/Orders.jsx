import { useState, useEffect } from "react";
import { Link  } from "react-router-dom";
import "./Orders.css";
import {toast} from "react-toastify";
import {getOrdersList} from "../services/orderService";


// Maps a status string to its badge color class
const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Delivered":
      return "status-badge status-delivered";
    case "Pending":
      return "status-badge status-pending";
    case "Cancelled":
      return "status-badge status-cancelled";
    default:
      return "status-badge";
  }
};

const Orders = () => {

const [orders, setOrders] = useState([]);

          useEffect(() => {
        
                  const fetchFoodItems = async () => {
        
                      try {
        
                          const response = await getOrdersList();
                          console.log(response);
                          if (response.data.success) {
                              setOrders(response.data.data);
                          }
        
                      } catch (error) {
                          console.error(error);
                      }
        
                  };
        
                  fetchFoodItems();
        
              }, []);
        




  return (
    <div className="orders-page">
      <div className="orders-container">
        <h2 className="fw-bold mb-4">Order History</h2>

        {orders.length === 0 ? (
          <p className="text-secondary text-center py-5">
            You haven't placed any orders yet.
          </p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.orderId} className="order-row shadow-sm">

                {/* Header: Order ID + Status */}
                <div className="order-row-header">
                  <span className="order-id"><small>Order : </small>{ order.orderId}</span>
                  <span className={getStatusBadgeClass(order.status)}>
                    <b>{order.status}</b>
                  </span>
                </div>

                {/* Food item with image */}
                <div className="order-food-info">
                  <img
                    src={order.imageUrl}
                    alt={order.foodName}
                    className="order-food-img"
                  />
                  <div>
                   <strong>
                     <p className="fw-semibold mb-0">{order.foodName}</p>
                    <p className="text-secondary small mb-0">Qty: {order.quantity}</p>
                   </strong>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="order-address">
                  <i className="bi bi-geo-alt me-1 text-secondary"></i>
                  <span className="text-secondary small">
                    <b>{order.addressLine}, {order.city}, {order.state} — {order.pincode}</b>
                  </span>
                </div>

                {/* Footer: Date + Total */}
                <div className="order-row-footer">
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </span>
                  <span className="order-total">
                    ₹{Number(order.total).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-4">
          <Link to="/" className="back-to-home-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orders;
