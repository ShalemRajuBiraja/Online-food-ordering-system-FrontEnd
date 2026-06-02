import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


const AdminLogin = () => {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setAdminData({
            ...adminData,
            [e.target.name]: e.target.value
        });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const apiResponse = await axios.post(
            "http://localhost:8080/auth/admin/login",
            adminData
        );

        if (apiResponse.data.success) {

            localStorage.setItem(
                "user",
                JSON.stringify(apiResponse.data.data)
            );

            if (apiResponse.data.data.role === "admin") {
                toast.success("authenticated✅");
                setTimeout(() => {
                    navigate("/adminpage");
                }, 1500);
            } else {
                navigate("/");
            }

        }

    } catch (error) {

        console.error("Admin login failed:", error);

        if(error.response){
            alert(error.response.data.message);
        }else{
            alert("Server is not responding");
        }
    }
};

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-5">
                    <div className="card shadow-lg">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">
                                Admin Login
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter Admin Email"
                                        value={adminData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        value={adminData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />
        </div>
    );
};

export default AdminLogin;