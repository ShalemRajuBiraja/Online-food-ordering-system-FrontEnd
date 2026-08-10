import  { useState, useEffect, useRef } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { Link } from "react-router-dom";
import "./Header.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleSwitchToSignup = () => {
  setShowLoginModal(false);
  setShowSignupModal(true);
};

 const handleSwitchToLogin = () => {
  setShowSignupModal(false);
  setShowLoginModal(true);
};

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    // Fires when localStorage changes in ANOTHER tab
    window.addEventListener("storage", syncAuthState);
    // Custom event we dispatch ourselves after login/logout in THIS tab
    window.addEventListener("authChange", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("authChange", syncAuthState);
    };
  }, []);



  // Close the dropdown when clicking anywhere outside it
  useEffect(() => {
  const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Derive initials from the logged-in user's name (stored earlier in localStorage)
  const getUserInitials = () => {
    
    return "BSR";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    // Tell every listening component (including this one) that auth changed
    window.dispatchEvent(new Event("authChange"));

    setIsLoggedIn(false);
    toast.success("Logout success");
    navigate("/home");  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm custom-header">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          FoodApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#headerNavbar"
          aria-controls="headerNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="headerNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            
            <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
               { !isLoggedIn &&(
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/adminLogin">
                      Admin Login
                    </Link>
                  </li>
                </>
               )

               }
         
{/* 
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-link-orders" to="/orders">
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-cart" to="/cart">
                    <i className="bi bi-cart3 me-1"></i>Cart
                  </Link>
                </li>
              </>
            )} */}
          </ul>

          <ul className="navbar-nav ms-auto align-items-lg-center">
            {!isLoggedIn ? (
              <>
                <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                 <button
                  className="btn btn-outline-primary btn-sm w-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLoginModal(true);
                  }}
                >
                Login
              </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-primary btn-sm w-100"
                    onClick={() => setShowSignupModal(true)}
                  >
                    Signup
                  </button>
                </li>
              </>
            ) : (
              <>
                {isLoggedIn && (
                  <li className="nav-item me-lg-2">
                    <Link to="/orders" className="orders-highlight-btn">
                      <i className="bi bi-bag-check me-1"></i>
                      Your Orders
                    </Link>
                  </li>
                )}
                
                <li className="nav-item me-lg-3 mb-2 mb-lg-0 position-relative" ref={profileMenuRef}>
             
                    <Link
                        to=""
                        className="nav-link p-0 profile-icon-link"
                        title="My Profile"
                        onClick={() => setShowProfileMenu((prev) => !prev)}
                      >
                        <div className="d-flex flex-column align-items-center">
                          <i className="bi bi-person-circle fs-4 text-dark"></i>
                          <span className="profile-label">User Profile</span>
                        </div>
                      </Link>

                   {showProfileMenu && (
                  <div className="profile-dropdown shadow">
                    <Link
                      to="/manage-address"
                      className="profile-dropdown-item"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Manage Address
                    </Link>

                    <Link
                      to="/reset-password"
                      className="profile-dropdown-item"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Reset Password
                    </Link>

                    <Link
                      to="/orders"
                      className="profile-dropdown-item"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Orders History
                    </Link>
                    
                    <hr className="profile-dropdown-divider" />

                    <Link
                      to="/"
                      className="profile-dropdown-item profile-dropdown-logout text-danger"
                      onClick={handleLogout}
                    >
                      <strong>Logout</strong>
                    </Link>
                  </div>
                  )}
                  </li>
              </>
            )}
          </ul>
        </div>
      </div>
        <LoginModal
            show={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onSwitchToSignup={handleSwitchToSignup}
        />

        <SignupModal
          show={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={handleSwitchToLogin}
        />
    </nav>
  );
};

export default Header;
