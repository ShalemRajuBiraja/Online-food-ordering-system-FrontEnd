import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Users = () => {

    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading]     = useState(false);

    // ✅ Fetch all users
    useEffect(() => {
        const getAllUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:8080/getAllUsers");
                console.log("Users List:", response.data.data);
                setUsersList(response.data.data || []);
            } catch (error) {
                toast.error("Failed to fetch users ❌");
            } finally {
                setLoading(false);
            }
        };
        getAllUsers();
    }, []);

    // ✅ Delete user with confirmation popup
    const handleDeleteUser = async (userId) => {

        // Confirmation popup before deleting
        const confirmed = window.confirm(
            `Are you sure you want to delete User ID: ${userId}?`
        );

        if (!confirmed) return;

        try {
            await axios.delete(`http://localhost:8080/deleteUser/${userId}`);
            toast.success("User deleted successfully! ✅");

            // Remove deleted user from UI without re-fetching
            setUsersList(usersList.filter(
                (user) => user.userId !== userId
            ));

        } catch (error) {
            toast.error("Failed to delete user ❌");
        }
    };

    return (
        <div className="app-container">

            <Navbar />

            <div className="main-content">
                <div className="container py-5">

                    {/* Header */}
                    <div className="d-flex align-items-center
                                    justify-content-between mb-4">
                        <div>
                            <h2 className="fw-bold mb-1">
                                👥 Manage Users
                            </h2>
                            <p className="text-muted mb-0">
                                Total Registered Users: <span
                                className="fw-bold text-warning">
                                    {usersList.length}
                                </span>
                            </p>
                        </div>
                        <span className="badge bg-warning
                                         text-dark fs-6 px-3 py-2">
                            🔐 Admin
                        </span>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="text-center mt-5">
                            <div className="spinner-border
                                            text-warning" />
                            <p className="mt-2 text-muted">
                                Loading users...
                            </p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && usersList.length === 0 && (
                        <div className="text-center mt-5">
                            <h5 className="text-muted">
                                No users found 👥
                            </h5>
                        </div>
                    )}

                    {/* Users Table */}
                    {!loading && usersList.length > 0 && (
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-0">
                                <table className="table
                                                  table-hover
                                                  mb-0">

                                    {/* Table Header */}
                                    <thead>
                                        <tr className="table-warning">
                                            <th className="py-3 px-4">
                                                # Roll No
                                            </th>
                                            <th className="py-3 px-4">
                                                User ID
                                            </th>
                                            <th className="py-3 px-4">
                                                Email
                                            </th>
                                            <th className="py-3 px-4
                                                            text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* Table Body */}
                                    <tbody>
                                        {usersList.map((user, index) => (
                                            <tr key={user.userId}>

                                                {/* Roll No */}
                                                <td className="py-3 px-4
                                                                fw-semibold
                                                                text-muted">
                                                    {index + 1}
                                                </td>

                                                {/* User ID */}
                                                <td className="py-3 px-4">
                                                    <span className="badge
                                                                     bg-warning
                                                                     text-dark
                                                                     px-3 py-2">
                                                        # {user.userId}
                                                    </span>
                                                </td>

                                                {/* Email */}
                                                <td className="py-3 px-4">
                                                    {user.email}
                                                </td>

                                                {/* Delete Button */}
                                                <td className="py-3 px-4
                                                                text-center">
                                                    <button
                                                        className="btn
                                                                   btn-danger
                                                                   btn-sm
                                                                   px-3"
                                                        onClick={() =>
                                                            handleDeleteUser(
                                                                user.userId
                                                            )
                                                        }
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <Footer />

            <ToastContainer
                position="top-right"
                autoClose={750}
                theme="colored"
            />

        </div>
    );
};

export default Users;