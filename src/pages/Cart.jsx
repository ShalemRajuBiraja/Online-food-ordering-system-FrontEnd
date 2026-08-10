import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { toast } from "react-toastify";
import {getCartItems,removeCartItem} from "../services/cartService"


// TODO: replace this with cart items fetched from GET /api/cart

const DELIVERY_FEE = 40.0;

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);


      useEffect(() => {

          const fetchCartItems = async () => {

              try {

                  const response = await getCartItems();
                  if (response.data.success) {
                      setCartItems(response.data.data);
                  }

              } catch (error) {
                  console.error(error);
                  toast.error(error.response?.data?.message || "Failed to load cart items");
              }

          };

          fetchCartItems();

      }, []);



  // UI-only handlers — swap these for your own API calls
  const handleIncrement = (cartId) => {
    // TODO: call PUT /api/cart/:id to update quantity on the backend
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (cartId) => {
    // TODO: call PUT /api/cart/:id to update quantity on the backend
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

 const handleRemove = async (cartId) => {

    try {
          const response = await removeCartItem(cartId);

          if (response.data.success) {

                setCartItems((prev) =>
                prev.filter((item) => item.cartId !== cartId)
            );

            toast.success(response.data.message);
        }

      } catch (error) {
       toast.error(
       error.response?.data?.message || "Failed to remove item"
       );
       console.log(error.message);
      }
  };

  const handleCheckout = () => {
    // TODO: navigate to checkout / create order via API
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = cartItems.length > 0 ? subtotal + DELIVERY_FEE : 0;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="fw-bold mb-4">Your Cart</h2>

        <div className="row g-4">
          {/* Cart Items List */}
          <div className="col-12 col-lg-8">
            {cartItems.length === 0 ? (
              <p className="text-secondary text-center py-5">
                Your cart is empty.
              </p>
            ) : (
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="cart-item-row shadow-sm">
                    <img
                      src={item.imageUrl}
                      alt={item.Name}
                      className="cart-item-img"
                    />

                    <div className="cart-item-details">
                      <h6 className="fw-bold mb-1">{item.foodName}</h6>
                      <p className="cart-item-price mb-0">
                        ₹{item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="cart-item-stepper">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleDecrement(item.cartId)}
                      >
                        −
                      </button>
                      <span className="mx-2 fw-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleIncrement(item.cartId)}
                      >
                        +
                      </button>
                    </div>

                    <div className="cart-item-total">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>

                    <button
                      type="button"
                      className="btn btn-link text-danger cart-item-remove"
                      onClick={() => handleRemove(item.cartId)}
                      aria-label="Remove item"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3">
              <Link to="/" className="back-to-home-link">
                ← Go to Home
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-12 col-lg-4">
            <div className="order-summary shadow-sm">
              <h5 className="fw-bold mb-3">Order Summary</h5>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>₹{cartItems.length > 0 ? DELIVERY_FEE.toFixed(2) : "0.00"}</span>
              </div>

              <hr />

              <div className="summary-row summary-total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <button
                type="button"
                className="btn btn-primary w-100 mt-3"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
