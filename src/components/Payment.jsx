import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";
import {toast} from "react-toastify";
import { getAddress } from "../services/addressService";
import {placeOrder} from "../services/orderService";


// TODO: replace this with the actual order/cart data passed from Cart.jsx or OrderNowModal
// (commonly done via useLocation() state, a context, or a route param + API fetch)

const DELIVERY_FEE = 20.0;

const Payment = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const orderItems = location.state?.items || JSON.parse(localStorage.getItem("orderItems")) || [];
  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" | "upi"
  const [userAddress, setAddress] = useState(null);


   useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await getAddress();
  
        if (response.data.success) {
          setAddress(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchAddress();
  }, []);

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.foodPrice * item.quantity,
    0
  );

  const total = subtotal + DELIVERY_FEE;

  const handlePlaceOrder = async (e) => {
  e.preventDefault();

  const item = orderItems[0];

  const orderData = {
    foodName: item.foodName,
    imageUrl: item.imageUrl,
    price: item.foodPrice,
    quantity: item.quantity,
    fullName: userAddress.fullName,
    phone: userAddress.phone,
    addressLine: userAddress.addressLine,
    city: userAddress.city,
    state: userAddress.state,
    pincode: userAddress.pincode,
    paymentMethod: paymentMethod.toUpperCase(),
    deliveryFee: DELIVERY_FEE,
    total: total,
  };

  try {
    const response = await placeOrder(orderData);
    if (response.data.success) {
      toast.success("Order Placed Successfully!");
      navigate("/orders", { replace: true });
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Order failed. Please try again.");
    console.log(error.message);
  }
};

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2 className="fw-bold mb-4">Payment</h2>

        <div className="row g-4">
          {/* Delivery Address */}
            <div className="col-12">
              <div className="payment-card shadow-sm">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-geo-alt me-2"></i>
                  Delivery Address
                </h5>

                {userAddress ? (
                  <div className="delivery-address-box">
                    <h6 className="fw-bold mb-1">{userAddress.fullName}</h6>
                    <p className="mb-1 text-secondary small">{userAddress.phone}</p>
                    <p className="mb-0">
                      {userAddress.addressLine}, {userAddress.city},{" "}
                      {userAddress.state} — {userAddress.pincode}
                    </p>
                  </div>
                ) : (
                  <div className="no-address-warning">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    No saved address found.{" "}
                    <Link to="/manage-address" className="text-danger fw-semibold">
                      Add your address here
                    </Link>{" "}
                    before placing an order.
                  </div>
                )}
              </div>
            </div>
          {/* Order Summary */}
          <div className="col-12 col-lg-6">
            <div className="payment-card shadow-sm">
              <h5 className="fw-bold mb-3">Order Summary</h5>

              <div className="order-summary-items">
                {orderItems.map((item, index) => (
                  <div key={index} className="order-summary-row">
                    <span>
                      {item.foodName} <span className="text-secondary"> x { item.quantity}</span>
                    </span>
                    <span>₹{(item.foodPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <hr />

              <div className="order-summary-row">
                <span><b>Sub total</b></span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="order-summary-row">
                <span>Delivery Fee</span>
                     <span>₹{orderItems.length > 0 ? DELIVERY_FEE.toFixed(2) : "0.00"}</span>
              </div>

              <hr />

              <div className="order-summary-row order-summary-total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="col-12 col-lg-6">
            <div className="payment-card shadow-sm">
              <h5 className="fw-bold mb-3">Select Payment Method</h5>

              <form onSubmit={handlePlaceOrder}>
                <div
                  className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <label htmlFor="cod" className="payment-option-label">
                    <i className="bi bi-cash-coin me-2"></i>
                    Cash on Delivery
                  </label>
                </div>

                <div
                  className={`payment-option ${paymentMethod === "upi" ? "selected" : ""}`}
                  onClick={() => setPaymentMethod("upi")}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="upi"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                  />
                  <label htmlFor="upi" className="payment-option-label">
                    <i className="bi bi-phone me-2"></i>
                    UPI Payment
                  </label>
                </div>

              {paymentMethod === "upi" && (
                <div className="upi-unavailable-notice mt-3">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    UPI Payment is currently not available. Please select Cash on Delivery.
                </div>
                )}

               <button
                    type="submit"
                    className="btn btn-primary w-100 mt-4"
                    disabled={orderItems.length === 0 || paymentMethod === "upi" || !userAddress}
                  >
                    Place Order — ₹{total.toFixed(2)}
                </button>

              </form>
            </div>s

            <div className="text-center mt-3">
              <Link
                    to="/home"
                    className="back-to-cart-link"
                    onClick={() => localStorage.removeItem("orderItems")}
                >
                    ← Back to home
             </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
