import React from "react";
import  { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";
import {checkIsUserLoggedIn} from "../utils/utils";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Navbar = () => {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(checkIsUserLoggedIn());

  // Logout function
      const handleLogout = () => {
        try {
          // 1. Clear localStorage
          localStorage.removeItem("userData");
          localStorage.removeItem("token");

          // 3. Update auth state
          setIsLoggedIn(false);

          // 4. Redirect to home
          navigate("/");              // if using React Router

          // 5. Optional: show success toast
          toast.success("Logged out successfully");

        } catch (error) {
          console.error("Logout failed:", error);
          // toast.error("Something went wrong during logout.");
        }
      };

      const handleProfile = () => {
        toast.info("Profile page coming soon!");
      };

      const handleDashboard = () => {
        toast.info("Dashboard page coming soon!");
      };

      const handleAddress = () => {
        toast.info("Address page coming soon!");
      };

      const handleNotifications = () => {
        toast.info("Notifications page coming soon!");
      };

      const handleAccounts = () => {
        toast.info("Account management page coming soon!");
      }
      
      const handleSettings = () => {
        toast.info("Settings page coming soon!");
      }





  return (
    <nav className="navbar navbar-expand-lg custom-navbar">

      <div className="container">

        {/* Logo */}
        <a className="navbar-brand logo" href="/">
          🍔 BiteRush
        </a>

          {/* Right Side Links */}
          <div className="d-flex align-items-center gap-3">

            <Link className="nav-link text-white" to="/home">
              HOME
            </Link>
            <Link className="nav-link text-white" to="/products">
              PRODUCTS
            </Link>
            <Link className="nav-link text-white" to="/types">
              TYPES
            </Link>
            <Link className="nav-link text-white" to="/contact">
              CONTACT US
            </Link>
            <Link className="nav-link text-white" to="/promotions">
              PROMOTIONS
            </Link>
          
              {
                    isLoggedIn &&

                    <Link className="nav-link text-white" to="/myorders">  MY ORDERS</Link>
              }

          </div>
           
          <div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
              My Account
              </button>
              <ul className="dropdown-menu">
                  <li>
                      { 
                        isLoggedIn &&
                         <div>
                          <button className="btn btn-light profile-btn dropdown-item" onClick={handleProfile}> Profile </button>
                          <button className="btn btn-light dashboard-btn dropdown-item" onClick={handleDashboard}> Dashboard </button>
                          <Link to="/viewcart"  className="btn btn-warning cart-btn m-2"> View cart </Link>
                          <button className="btn btn-light settings-btn dropdown-item" onClick={handleSettings}> Settings </button>
                          <button className="btn btn-light address-btn dropdown-item" onClick={handleAddress}> Manage Address </button>
                          <button className="btn btn-light notifications-btn dropdown-item" onClick={handleNotifications}> Notifications </button>
                          <button className="btn btn-light accounts-btn dropdown-item" onClick={handleAccounts}> Manage Account </button>
                          <Link to="/adminlogin"  className="btn btn-primary cart-btn m-2"> Admin DashBoard </Link>
                          <button type="button" className="btn btn-danger logout-btn m-3" onClick={handleLogout}>Logout ➡️</button>
                         </div>
                      }
                  </li>

                  <li>
                      {
                        !isLoggedIn &&
                        <div>
                           <button
                              className="btn btn-light login-btn dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#loginModal"
                            >
                              Login
                            </button>
                            <button
                              className="btn btn-dark signup-btn dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#signupModal"
                            >
                               Signup
                            </button>
                        </div>
                      
                      }
                    </li>
               
              </ul>
            </div>
          </div>

        </div>

    </nav>
  )
};

export default Navbar;