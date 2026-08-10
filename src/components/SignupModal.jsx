import "./SignupModal.css";
import { useState } from "react";
import { nameRegex, mobileRegex, passwordRegex, isEmailValid } from "../utils/reusableCode";
import { signup } from "../services/authService";
import { toast } from "react-toastify";
// Props:
// show   -> boolean, controls whether modal is visible
// onClose -> function, called when modal should close (backdrop click, X button, cancel)
const SignupModal = ({ show, onClose, onSwitchToLogin }) => {

  const [signupData, setSignupData] = useState({ fullName: "", email: "", mobileNumber: "", password: ""});
  const [signupErrors, setSignupErrors] = useState({ name: "", email: "", mobile: "", password: "" });
  if (!show) return null;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //CREATE ACCOUNT FUNCTION
  const handleCreateAccount = async (e) => {
    e.preventDefault();

    let tempErrors = { name: "", email: "", mobile: "", password: "" };
    let hasErrors = false;

    if (!signupData.fullName.trim()) {
      tempErrors.name = "Name is required";
      hasErrors = true;
    } else if (!nameRegex.test(signupData.fullName)) {
      tempErrors.name = "Name can only contain letters and spaces";
      hasErrors = true;
    } 

    if (!signupData.email.trim()) {
      tempErrors.email = "Email is required";
      hasErrors = true;
    } else if (!isEmailValid(signupData.email)) {
      tempErrors.email = "Please enter a valid email address";
      hasErrors = true;
    }

    if (!signupData.mobileNumber.trim()) {
      tempErrors.mobile = "Mobile number is required";
      hasErrors = true;
    } else if (!mobileRegex.test(signupData.mobileNumber)) {
      tempErrors.mobile = "Please enter a valid mobile number";
      hasErrors = true;
    }

    if (!signupData.password.trim()) {
      tempErrors.password = "Password is required";
      hasErrors = true;
    } else if (!passwordRegex.test(signupData.password)) {
      tempErrors.password = "Enter long password with uppercase, lowercase, and number";
      hasErrors = true;
    } 
    

    setSignupErrors(tempErrors);

    if (!hasErrors) {
        try{
              const userData = await signup(signupData);
                if (userData?.data?.success) {
                    toast.success("Account created successfully!");
                     onSwitchToLogin();   // ✅ closes Signup modal, opens Login modal
                }

        } catch (error) {
            console.log(error.message);
            toast.error( error.response?.data?.message );
        }
    
    } //if closed
  };

  return (
    <>
      <div className="modal-backdrop-custom" onClick={onClose}></div>

      <div className="signup-modal-wrapper">
        <div className="signup-modal-box shadow">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">Create Account❤️</h4>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleCreateAccount} noValidate> {/* noValidate is used to disable the browser's default validation. without this, browser show own error messages */}
            <div className="mb-3">
              <label htmlFor="signupName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="signupName"
                name="fullName"
                placeholder="Your full name"
                value={signupData.fullName}
                onChange={handleChange}
              />
              {signupErrors.name && <div className="text-danger small">{signupErrors.name}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="signupEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                required
                className="form-control"
                id="signupEmail"
                name="email"
                placeholder="you@example.com"
                value={signupData.email}
                onChange={handleChange}
              />
              {signupErrors.email && <div className="text-danger small">{signupErrors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="signupMobile" className="form-label">
                Mobile Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="signupMobile"
                name="mobileNumber"
                placeholder="Your mobile number"
                value={signupData.mobileNumber}
                onChange={handleChange}
              />
              {signupErrors.mobile && <div className="text-danger small">{signupErrors.mobile}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="signupPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="signupPassword"
                name="password"
                placeholder="Create a password"
                value={signupData.password}
                onChange={handleChange}
              />
              {signupErrors.password && <div className="text-danger small">{signupErrors.password}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100" >
              Sign Up
            </button>
          </form>

          <p className="text-center text-secondary mt-3 mb-0 small">
            Already have an account?{' '}
            <button
              type="button"
              className="btn btn-link p-0 align-baseline"
              onClick={onSwitchToLogin}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupModal;
