import "./LoginModal.css";
import { useState } from "react";
import { isEmailValid, passwordRegex } from "../utils/reusableCode";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Props:
// show   -> boolean, controls whether modal is visible
// onClose -> function, called when modal should close (backdrop click, X button, cancel)
const LoginModal = ({ show, onClose, onSwitchToSignup  }) => {

    const [loginData, setLoginData] = useState({email: "", password: ""});
    const [loginErrors, setLoginErrors] = useState({email: "", password: ""});
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

  if (!show) return null;

  const handleLogin = async (e) => {

    e.preventDefault();

    let tempErrors = {...loginErrors};
    let hasErrors = false;

    if(!loginData.email.trim()){
        tempErrors.email = "Email is required";
        hasErrors = true;
    } else if(!isEmailValid(loginData.email)){
        tempErrors.email = "Please enter a valid email address";
        hasErrors = true;
    }

    if(!loginData.password.trim()){
        tempErrors.password = "Password is required";
        hasErrors = true;
    } else if(!passwordRegex.test(loginData.password)){
        tempErrors.password = "Enter long password with uppercase, lowercase, and number";
        hasErrors = true;
    }

    setLoginErrors(tempErrors);
    if (!hasErrors) {
        try {
            const response = await login(loginData);

            if (response?.data?.success) {
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("userData", JSON.stringify(response.data.data.userData));
                
                window.dispatchEvent(new Event("authChange"));
                toast.success("Login successful!");
                setTimeout(() => {
                  onClose();
                  navigate("/home");
                }, 0);
            }
        } catch (error) {
            console.error("Login failed:", error);
            toast.error(error.response?.data?.message);
        }
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop-custom" onClick={onClose}></div>

      {/* Modal */}
      <div className="login-modal-wrapper">
        <div className="login-modal-box shadow">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">Login 🚀</h4>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          {/* TODO: server error message will go here */}

          <form onSubmit={handleLogin} noValidate>
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label">
                Email address
              </label>
             <input
                  type="email"
                  className={`form-control ${loginErrors.email ? "is-invalid" : ""}`}
                  id="loginEmail"
                  name="email"
                  placeholder="you@example.com"
                  value={loginData.email}
                  onChange={(e) => {
                  setLoginData({...loginData, email: e.target.value});
                  setLoginErrors((prev) => ({...prev, email: ""}));
                }}                />
                {loginErrors.email && (
                  <div className="invalid-feedback">{loginErrors.email}</div>
                )}
              {/* TODO: field error message will go here */}
            </div>

           <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">
              Password
            </label>
            <div className="password-input-wrapper">
             <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${loginErrors.password ? "is-invalid" : ""}`}
                    id="loginPassword"
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                      onChange={(e) => {
                        setLoginData({...loginData, password: e.target.value});
                        setLoginErrors((prev) => ({...prev, password: ""}));
                      }}                  />
                  {loginErrors.password && (
                    <div className="invalid-feedback">{loginErrors.password}</div>
                  )}
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </span>
              
            </div>
             {/* TODO: field error message will go here */}
        </div>
              <div>
              {/* TODO: field error message will go here */}
            </div>

           <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={(e) => e.stopPropagation()}
            >
            Login
          </button>
          </form>

          <p className="text-center text-secondary mt-3 mb-0 small">
                Don't have an account?{" "}
                <button
                    type="button"
                    className="btn btn-link p-0 align-baseline"
                    onClick={onSwitchToSignup}
                >
        Sign up
      </button>
    </p>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
