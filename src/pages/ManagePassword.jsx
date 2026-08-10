import { useState } from "react";
import "./ManagePassword.css";
import {Link} from "react-router-dom";

// Two top-level modes:
// "update" -> old password + new password + confirm (user already logged in)
// "reset"  -> forgot-password flow: email -> OTP -> new password (3 steps)
const ManagePassword = () => {
  const [mode, setMode] = useState("update"); // "update" | "reset"

  // ---- Update Password state ----
  const [updateForm, setUpdateForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    // TODO: Step 1 - validate old/new/confirm password fields
    // TODO: Step 2 - call PUT/POST /api/users/update-password with { oldPassword, newPassword }
    // TODO: Step 3 - show success/error toast
    alert("Reset password is under development");
  };

  // ---- Reset Password (forgot password) state ----
  const [resetStep, setResetStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPasswordForm, setNewPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleSendOtp = (e) => {
    e.preventDefault();
    // TODO: validate email format
    // TODO: call POST /api/auth/forgot-password with { email }
    // TODO: on success -> setResetStep(2)
    setResetStep(2); // placeholder step advance so you can see the flow
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // TODO: validate OTP format (e.g. 6 digits)
    // TODO: call POST /api/auth/verify-otp with { email, otp }
    // TODO: on success -> setResetStep(3)
    setResetStep(3); // placeholder step advance so you can see the flow
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    // TODO: validate newPassword/confirmPassword match + strength
    // TODO: call POST /api/auth/reset-password with { email, otp, newPassword }
    // TODO: on success -> redirect to /login, show success toast
  };

  const handleNewPasswordChange = (e) => {
    const { name, value } = e.target;
    setNewPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="manage-password-page d-flex align-items-center justify-content-center">
      <div className="manage-password-card shadow-sm">
        <p className="text-center text-danger">Reset password is under development</p>
        <h2 className="text-center fw-bold mb-4 manage-password-title">
          Manage Password
        </h2>

        {/* Mode Switch Tabs */}
        <div className="mode-tabs mb-4">
          <button
            type="button"
            className={`mode-tab ${mode === "update" ? "active" : ""}`}
            onClick={() => setMode("update")}
          >
            Update Password
          </button>
          <button
            type="button"
            className={`mode-tab ${mode === "reset" ? "active" : ""}`}
            onClick={() => {
              setMode("reset");
              setResetStep(1);
            }}
          >
            Reset Password
          </button>
        </div>

        {/* ---------------- UPDATE PASSWORD ---------------- */}
        {mode === "update" && (
        <form onSubmit={handleUpdateSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="oldPassword" className="form-label">
                Enter Old Password
              </label>
              <input
                type="password"
                className="form-control"
                id="oldPassword"
                name="oldPassword"
                value={updateForm.oldPassword}
                onChange={handleUpdateChange}
                placeholder="Old password"
              />
              {/* TODO: field error message */}
            </div>

            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                Enter New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                value={updateForm.newPassword}
                onChange={handleUpdateChange}
                placeholder="New password"
              />
              {/* TODO: field error message */}
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={updateForm.confirmPassword}
                onChange={handleUpdateChange}
                placeholder="Confirm new password"
              />
              {/* TODO: field error message */}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Okay
            </button>
            <div className="text-center mt-4">
                <Link to="/" className="back-to-home-link"> ← Back to Home </Link></div> 
        </form>
        )}

        {/* ---------------- RESET PASSWORD (forgot password) ---------------- */}
        {mode === "reset" && (
          <>
            {/* Step Indicator */}
            <div className="step-indicator mb-4">
              <span className={`step-dot ${resetStep >= 1 ? "active" : ""}`}>1</span>
              <span className="step-line"></span>
              <span className={`step-dot ${resetStep >= 2 ? "active" : ""}`}>2</span>
              <span className="step-line"></span>
              <span className={`step-dot ${resetStep >= 3 ? "active" : ""}`}>3</span>
            </div>

            {/* Step 1: Enter Email */}
            {resetStep === 1 && (
              <form onSubmit={handleSendOtp} noValidate>
                <p className="text-secondary small mb-3">
                  Enter your registered email to receive an OTP.
                </p>
                <div className="mb-4">
                  <label htmlFor="resetEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="resetEmail"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                  {/* TODO: field error message */}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send OTP
                </button>
              </form>
            )}

            {/* Step 2: OTP Confirmation */}
            {resetStep === 2 && (
              <form onSubmit={handleVerifyOtp} noValidate>
                <p className="text-secondary small mb-3">
                  Enter the OTP sent to <strong>{email || "your email"}</strong>.
                </p>
                <div className="mb-4">
                  <label htmlFor="otp" className="form-label">
                    OTP Code
                  </label>
                  <input
                    type="text"
                    className="form-control otp-input"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                  {/* TODO: field error message */}
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-2">
                  Verify OTP
                </button>
                <button
                  type="button"
                  className="btn btn-link w-100"
                  onClick={() => setResetStep(1)}
                >
                  Back
                </button>
              </form>
            )}

            {/* Step 3: New Password */}
            {resetStep === 3 && (
              <form onSubmit={handleResetPasswordSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="resetNewPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="resetNewPassword"
                    name="newPassword"
                    value={newPasswordForm.newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder="New password"
                  />
                  {/* TODO: field error message */}
                </div>

                <div className="mb-4">
                  <label htmlFor="resetConfirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="resetConfirmPassword"
                    name="confirmPassword"
                    value={newPasswordForm.confirmPassword}
                    onChange={handleNewPasswordChange}
                    placeholder="Confirm new password"
                  />
                  {/* TODO: field error message */}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Reset Password
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManagePassword;
