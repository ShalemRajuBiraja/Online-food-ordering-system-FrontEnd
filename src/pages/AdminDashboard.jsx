import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import {toast} from "react-toastify";

// TODO: replace dummy stats with real API calls
const dummyStats = {
  totalUsers: 100,
  totalOrders: 20,
  totalFoodItems: 3,
  totalRevenue: 10000.00,
};

// TODO: replace dummy lists with real API calls
const dummyUsers = [
  { userId: 1, fullName: "Shalem Raju", email: "shalem@gmail.com", mobileNumber: "9347796191", role: "USER" },
  { userId: 2, fullName: "Ravi Kumar", email: "ravi@gmail.com", mobileNumber: "9876543210", role: "USER" },
  { userId: 3, fullName: "Sneha Reddy", email: "sneha@gmail.com", mobileNumber: "9123456789", role: "USER" },
];

const dummyOrders = [
  { orderId: 1, foodName: "Chicken Biryani", fullName: "Shalem Raju", total: 299, status: "Pending", createdAt: "2026-07-14" },
  { orderId: 2, foodName: "Veg Fried Rice", fullName: "Ravi Kumar", total: 169, status: "Delivered", createdAt: "2026-07-13" },
  { orderId: 3, foodName: "Mutton Soup", fullName: "Sneha Reddy", total: 189, status: "Cancelled", createdAt: "2026-07-12" },
];

const dummyFoodItems = [
  { id: 1, foodName: "Chicken Biryani", foodPrice: 299, quantity: 20, imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8" },
  { id: 2, foodName: "Veg Fried Rice", foodPrice: 169, quantity: 35, imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107aa7e1fe" },
  { id: 3, foodName: "Mutton Soup", foodPrice: 189, quantity: 15, imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd" },
];

const dummyRevenue = [
  { orderId: 1, foodName: "Chicken Biryani", fullName: "Shalem Raju", total: 299, status: "Delivered", createdAt: "2026-07-14" },
  { orderId: 2, foodName: "Prawns Biryani", fullName: "Ravi Kumar", total: 349, status: "Delivered", createdAt: "2026-07-13" },
];

// ── Count-up animated stat card ──
const StatCard = ({ icon, label, value, color, prefix, isActive, onClick }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const target = typeof value === "number" ? value : 0;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, target);
      setDisplayValue(Math.floor(current));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div
      className={`stat-card stat-card--${color} ${isActive ? "stat-card--active" : ""}`}
      onClick={onClick}
      title={`Click to view ${label}`}
    >
      <div className="stat-card__icon-wrapper">
        <i className={`bi ${icon} stat-card__icon`}></i>
      </div>
      <div className="stat-card__body">
        <p className="stat-card__label">{label}</p>
        <h2 className="stat-card__value">
          {prefix && <span className="stat-card__prefix">{prefix}</span>}
          {displayValue.toLocaleString("en-IN")}
        </h2>
      </div>
      <div className="stat-card__arrow">
        <i className={`bi ${isActive ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
      </div>
    </div>
  );
};

// ── Status badge helper ──
const StatusBadge = ({ status }) => {
  const map = {
    Delivered: "badge-delivered",
    Pending: "badge-pending",
    Cancelled: "badge-cancelled",
  };
  return <span className={`admin-badge ${map[status] || ""}`}>{status}</span>;
};

// ── AdminDashboard ──
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats] = useState(dummyStats);
  const [activeSection, setActiveSection] = useState(null); // "users" | "orders" | "foods" | "revenue"

  // TODO: replace with real API calls
  const [users] = useState(dummyUsers);
  const [orders] = useState(dummyOrders);
  const [foodItems] = useState(dummyFoodItems);
  const [revenueOrders] = useState(dummyRevenue);

  const handleCardClick = (section) => {
    // Toggle — clicking the same card again collapses it
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    window.dispatchEvent(new Event("authChange"));

    toast.success("Admin Logged Out");

    setTimeout(() => {
        navigate("/");
    }, 2000); // Wait for 2 seconds

};
  return (
    <div className="admin-dashboard">
      {/* Top Bar */}
      <header className="admin-topbar">
        <div className="admin-topbar__brand">
          <i className="bi bi-shop me-2"></i>
          FoodApp <span className="admin-topbar__badge">Admin</span>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </header>

      {/* Main */}
      <main className="admin-main">
        <div className="admin-welcome">
          <h1 className="admin-welcome__title">Dashboard Overview</h1>
          <p className="admin-welcome__sub">
            Click any card to view the full list below.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="stat-cards-grid">
          <StatCard
            icon="bi-people-fill"
            label="Total Users"
            value={stats.totalUsers}
            color="blue"
            isActive={activeSection === "users"}
            onClick={() => handleCardClick("users")}
          />
          <StatCard
            icon="bi-bag-check-fill"
            label="Total Orders"
            value={stats.totalOrders}
            color="orange"
            isActive={activeSection === "orders"}
            onClick={() => handleCardClick("orders")}
          />
          <StatCard
            icon="bi-egg-fried"
            label="Total Food Items"
            value={stats.totalFoodItems}
            color="green"
            isActive={activeSection === "foods"}
            onClick={() => handleCardClick("foods")}
          />
          <StatCard
            icon="bi-currency-rupee"
            label="Total Revenue"
            value={stats.totalRevenue}
            color="purple"
            prefix="₹"
            isActive={activeSection === "revenue"}
            onClick={() => handleCardClick("revenue")}
          />
        </div>

        {/* ── Expandable List Sections ── */}

        {/* Users List */}
        {activeSection === "users" && (
          <div className="admin-list-section">
            <h5 className="admin-list-title">
              <i className="bi bi-people-fill me-2 text-info"></i>All Users
            </h5>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.userId}>
                      <td>{index + 1}</td>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.mobileNumber}</td>
                      <td>
                        <span className={`admin-badge ${user.role === "ADMIN" ? "badge-delivered" : "badge-pending"}`}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders List */}
        {activeSection === "orders" && (
          <div className="admin-list-section">
            <h5 className="admin-list-title">
              <i className="bi bi-bag-check-fill me-2 text-warning"></i>All Orders
            </h5>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order ID</th>
                    <th>Food Item</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.orderId}>
                      <td>{index + 1}</td>
                      <td>#{order.orderId}</td>
                      <td>{order.foodName}</td>
                      <td>{order.fullName}</td>
                      <td>₹{Number(order.total).toFixed(2)}</td>
                      <td><StatusBadge status={order.status} /></td>
                      <td>{order.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Food Items List */}
        {activeSection === "foods" && (
          <div className="admin-list-section">
            <h5 className="admin-list-title">
              <i className="bi bi-egg-fried me-2 text-success"></i>All Food Items
            </h5>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Food Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {foodItems.map((food, index) => (
                    <tr key={food.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={food.imageUrl}
                          alt={food.foodName}
                          className="admin-food-img"
                        />
                      </td>
                      <td>{food.foodName}</td>
                      <td>₹{Number(food.foodPrice).toFixed(2)}</td>
                      <td>{food.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Revenue List — Delivered orders only */}
        {activeSection === "revenue" && (
          <div className="admin-list-section">
            <h5 className="admin-list-title">
              <i className="bi bi-currency-rupee me-2 text-purple"></i>
              Revenue Breakdown (Delivered Orders)
            </h5>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order ID</th>
                    <th>Food Item</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueOrders.map((order, index) => (
                    <tr key={order.orderId}>
                      <td>{index + 1}</td>
                      <td>#{order.orderId}</td>
                      <td>{order.foodName}</td>
                      <td>{order.fullName}</td>
                      <td>₹{Number(order.total).toFixed(2)}</td>
                      <td>{order.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="admin-table__total-label">Total Revenue</td>
                    <td className="admin-table__total-value">
                      ₹{revenueOrders.reduce((sum, o) => sum + Number(o.total), 0).toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
