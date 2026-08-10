import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import {toast} from "react-toastify";
import {adminLogin} from "../services/authService";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setServerError("");

    try {

        const response = await adminLogin(formData);

        if (response.data.success) {
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("userData", JSON.stringify(response.data.data.userData));
                toast.success(response.data.message);

                navigate("/adminDashboard");

        }

    } catch (error) {

        setServerError(
            error.response?.data?.message || "Invalid Email or Password"
        );
        console.log(error.message);

    }

};

  return (
    <div className="admin-login-page d-flex align-items-center justify-content-center">
      <div className="admin-login-card shadow-sm">
        <div className="text-center mb-3">
          <span className="admin-badge">ADMIN</span>
        </div>

        <h2 className="text-center fw-bold mb-1 admin-login-title">
          Admin Login
        </h2>
        <p className="text-center text-warning mb-4">
          Restricted access — authorized personnel only
        </p>

        {serverError && (
          <div className="alert alert-danger py-2 small" role="alert">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="adminEmail" className="form-label">
              Admin Email
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="adminEmail"
              name="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="adminPassword" className="form-label">
              Admin Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="adminPassword"
              name="password"
              placeholder="Enter admin password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 admin-login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Verifying...
              </>
            ) : (
              "Login as Admin"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/" className="back-to-home-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
