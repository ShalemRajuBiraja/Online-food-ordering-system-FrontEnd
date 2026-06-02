import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminDashboard = () => {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0
    });

    useEffect(() => {
        const getStats = async () => {
            try {
                const productsRes = await axios.get("http://localhost:8080/getProducts");
                const ordersRes   = await axios.get("http://localhost:8080/getAllOrders");
                const usersRes    = await axios.get("http://localhost:8080/getAllUsers");

                setStats({
                    totalProducts: productsRes.data.data.length,
                    totalOrders:   ordersRes.data.data.length,
                    totalUsers:    usersRes.data.data.length
                });
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        };
        getStats();
    }, []);

    return (
        <div className="app-container">

            <Navbar />

            <div className="main-content">
                <div className="container py-5">

                    {/* Header */}
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <div>
                            <h2 className="fw-bold mb-1">
                                👑 Admin Dashboard
                            </h2>
                            <p className="text-muted mb-0">
                                Welcome back! Manage your BiteRush application here.
                            </p>
                        </div>
                        <span className="badge bg-warning text-dark fs-6 px-3 py-2">
                            🔐 Admin
                        </span>
                    </div>

                    {/* Stats Cards */}
                    <div className="row g-4 mb-5">

                        {/* Total Products */}
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100"
                                style={{ borderLeft: "5px solid #ffc107" }}>
                                <div className="card-body d-flex align-items-center gap-4 p-4">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: "65px", height: "65px", background: "#fff3cd", fontSize: "28px" }}>
                                        🍔
                                    </div>
                                    <div>
                                        <p className="text-muted mb-1 fw-semibold">
                                            Total Products
                                        </p>
                                        <h2 className="fw-bold mb-0 text-warning">
                                            {stats.totalProducts}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Orders */}
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100"
                                style={{ borderLeft: "5px solid #ffc107" }}>
                                <div className="card-body d-flex align-items-center gap-4 p-4">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: "65px", height: "65px", background: "#fff3cd", fontSize: "28px" }}>
                                        📋
                                    </div>
                                    <div>
                                        <p className="text-muted mb-1 fw-semibold">
                                            Total Orders
                                        </p>
                                        <h2 className="fw-bold mb-0 text-warning">
                                            {stats.totalOrders}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Users */}
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100"
                                style={{ borderLeft: "5px solid #ffc107" }}>
                                <div className="card-body d-flex align-items-center gap-4 p-4">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: "65px", height: "65px", background: "#fff3cd", fontSize: "28px" }}>
                                        👥
                                    </div>
                                    <div>
                                        <p className="text-muted mb-1 fw-semibold">
                                            Total Users
                                        </p>
                                        <h2 className="fw-bold mb-0 text-warning">
                                            {stats.totalUsers}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Action Cards */}
                    <h5 className="fw-bold mb-4">⚡ Quick Actions</h5>
                    <div className="row g-4">

                        {/* Manage Products */}
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 admin-action-card">
                                <div className="card-body text-center p-5">
                                    <div className="mb-3" style={{ fontSize: "48px" }}>
                                        🍕
                                    </div>
                                    <h5 className="fw-bold mb-2">
                                        Manage Products
                                    </h5>
                                    <p className="text-muted mb-4">
                                        Add, edit or delete food items from your menu
                                    </p>
                                    <button
                                        className="btn btn-warning fw-bold px-4"
                                        onClick={() => navigate("/admin/products")}
                                    >
                                        Go to Products →
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* View All Orders */}
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 admin-action-card">
                                <div className="card-body text-center p-5">
                                    <div className="mb-3" style={{ fontSize: "48px" }}>
                                        📦
                                    </div>
                                    <h5 className="fw-bold mb-2">
                                        View All Orders
                                    </h5>
                                    <p className="text-muted mb-4">
                                        Track and manage all customer orders
                                    </p>
                                    <button
                                        className="btn btn-warning fw-bold px-4"
                                        onClick={() => navigate("/admin/orders")}
                                    >
                                        Go to Orders →
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Manage Users */}
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 admin-action-card">
                                <div className="card-body text-center p-5">
                                    <div className="mb-3" style={{ fontSize: "48px" }}>
                                        👤
                                    </div>
                                    <h5 className="fw-bold mb-2">
                                        Manage Users
                                    </h5>
                                    <p className="text-muted mb-4">
                                        View and manage all registered users
                                    </p>
                                    <button
                                        className="btn btn-warning fw-bold px-4"
                                        onClick={() => navigate("/admin/users")}
                                    >
                                        Go to Users →
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <Footer />

        </div>
    );
};

export default AdminDashboard;