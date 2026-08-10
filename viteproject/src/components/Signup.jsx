import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {

  // Form data state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });

  // Touched state (to show errors only after user touches field)
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    mobile: false,
    password: false
  });

  // API states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  // ✅ RESET FORM FUNCTION
  const resetForm = () => {
    setSignupData({ name: "", email: "", mobile: "", password: "" });
    setValidationErrors({ name: "", email: "", mobile: "", password: "" });
    setTouched({ name: false, email: false, mobile: false, password: false });
    setIsSubmitting(false);
    setApiError("");
    setApiSuccess("");
  };

  // ✅ RESET ON MODAL CLOSE
  useEffect(() => {
    const modal = document.getElementById("signupModal");
    if (modal) {
      modal.addEventListener("hidden.bs.modal", resetForm);
      return () => {
        modal.removeEventListener("hidden.bs.modal", resetForm);
      };
    }
  }, []);

  // ✅ VALIDATE SINGLE FIELD
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required!";
        } else if (value.trim().length < 3) {
          error = "Name must be at least 3 characters!";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required!";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) {
          error = "Enter a valid email address!";
        }
        break;

      case "mobile":
        if (!value.trim()) {
          error = "Mobile number is required!";
        } else if (!/^[6-9]\d{9}$/.test(value)) {
          error = "Enter a valid 10 digit mobile number!";
        }
        break;

      // case "password":
      //   if (!value.trim()) {
      //     error = "Password is required!";
      //   } else if (value.length < 6) {
      //     error = "Password must be at least 6 characters!";
      //   } else if (!/[a-zA-Z]/.test(value)) {
      //     error = "Password must have at least one letter!";
      //   } else if (!/[0-9]/.test(value)) {
      //     error = "Password must have one number!";
      //   }
      //   break;
      case "password":
        if (!value.trim()) {
          error = "Password is required!";
        } 
        else if (value.length < 6) {
          error = "Password must be at least 6 characters!";
        } 
        else if (!/[A-Z]/.test(value)) {
          error = "Password must contain one uppercase letter!";
        } 
        else if (!/[a-z]/.test(value)) {
          error = "Password must contain one lowercase letter!";
        } 
        else if (!/[0-9]/.test(value)) {
          error = "Password must contain one number!";
        } 
        else if (!/[@$!%*?&]/.test(value)) {
          error = "Password must contain one special character!";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // ✅ VALIDATE ALL FIELDS
  const validateAll = () => {
    let errors = {};
    Object.keys(signupData).forEach((key) => {
      const error = validateField(key, signupData[key]);
      if (error) errors[key] = error;
    });
    return errors;
  };

  // ✅ HANDLE CHANGE with real time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });

    // Real time validation after field is touched
    if (touched[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: validateField(name, value)
      });
    }
  };

  // ✅ HANDLE BLUR
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setValidationErrors({
      ...validationErrors,
      [name]: validateField(name, value)
    });
  };

  // ✅ HANDLE SIGNUP
  const handleSignup = async () => {

    // Touch all fields
    setTouched({ name: true, email: true, mobile: true, password: true });

    // Validate all fields
    const errors = validateAll();
    setValidationErrors(errors);

    // Stop if errors exist
    if (Object.keys(errors).length > 0) return;

    // Call API
    try {
      setIsSubmitting(true);
      setApiError("");
      setApiSuccess("");

      const apiResponse = await axios.post("http://localhost:8080/auth/signup",signupData);

      console.log("Signup successful:", apiResponse.data);
      toast.success("Account created successfully! Please login.");
      setApiSuccess("Account created successfully! Please login. ✅");
      setIsSubmitting(false);

      // Reset form after success
      setTimeout(() => {
        resetForm();
      }, 2000);

    } catch (error) {
      setIsSubmitting(false);
      setApiError(
        error.response?.data?.message || "Signup failed! Please try again."
      );
    }
  };

  return (
    <div className="modal fade" id="signupModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          {/* Header */}
          <div className="modal-header border-0">
            <h3 className="modal-title fw-bold">Create Account</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={resetForm}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body px-4 pb-4">

            {/* API Success Message */}
            {apiSuccess && (
              <div className="alert alert-success py-2 mb-3">
                {apiSuccess}
              </div>
            )}

            {/* API Error Message */}
            {apiError && (
              <div className="alert alert-danger py-2 mb-3">
                {apiError}
              </div>
            )}

            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${
                  touched.name && validationErrors.name
                    ? "is-invalid"
                    : touched.name && !validationErrors.name
                    ? "is-valid"
                    : ""
                }`}
                placeholder="Enter your name"
                value={signupData.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && validationErrors.name && (
                <div className="invalid-feedback">
                  {validationErrors.name}
                </div>
              )}
              {touched.name && !validationErrors.name && signupData.name && (
                <div className="valid-feedback">Looks good! ✅</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${
                  touched.email && validationErrors.email
                    ? "is-invalid"
                    : touched.email && !validationErrors.email
                    ? "is-valid"
                    : ""
                }`}
                placeholder="Enter your email"
                value={signupData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && validationErrors.email && (
                <div className="invalid-feedback">
                  {validationErrors.email}
                </div>
              )}
              {touched.email && !validationErrors.email && signupData.email && (
                <div className="valid-feedback">Looks good! ✅</div>
              )}
            </div>

            {/* Mobile */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Mobile</label>
              <input
                type="tel"
                name="mobile"
                className={`form-control ${
                  touched.mobile && validationErrors.mobile
                    ? "is-invalid"
                    : touched.mobile && !validationErrors.mobile
                    ? "is-valid"
                    : ""
                }`}
                placeholder="Enter mobile number"
                value={signupData.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.mobile && validationErrors.mobile && (
                <div className="invalid-feedback">
                  {validationErrors.mobile}
                </div>
              )}
              {touched.mobile && !validationErrors.mobile && signupData.mobile && (
                <div className="valid-feedback">Looks good! ✅</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${
                  touched.password && validationErrors.password
                    ? "is-invalid"
                    : touched.password && !validationErrors.password
                    ? "is-valid"
                    : ""
                }`}
                placeholder="Enter password"
                value={signupData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && validationErrors.password && (
                <div className="invalid-feedback">
                  {validationErrors.password}
                </div>
              )}
              {touched.password && !validationErrors.password && signupData.password && (
                <div className="valid-feedback">Looks good! ✅</div>
              )}
              <div className="form-text text-muted">
                Min 6 chars, one uppercase, one number
              </div>
            </div>

            {/* Signup Button */}
            <button
              className="btn btn-dark w-100 mt-2"
              onClick={handleSignup}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Sign Up 🚀"}
            </button>

            {/* Login Section */}
            <div className="text-center mt-4">
              <p className="mb-2">Already have an account?</p>
              <div className="d-grid gap-2">
                <button
                  className="btn text-white bg-success"
                  data-bs-dismiss="modal"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Login🔥😎
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
