import { useState, useEffect } from "react";
import "./OrderNowModal.css";
import { useNavigate } from "react-router-dom";

// Props:
// show   -> boolean, controls whether modal is visible
// onClose -> function, called when modal should close (backdrop click, X button, cancel)
// food   -> the food item object being ordered (name, imageUrl, price, etc.)
const OrderNowModal = ({ show, onClose, food }) => {

  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Reset quantity back to 1 every time a new food item is opened
  useEffect(() => {
    if (show) {
      setQuantity(1);
    }
  }, [show, food]);

  // Lock page scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);


  if (!show || !food) return null;

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };


  const totalPrice = (food.foodPrice * quantity).toFixed(2);

  const handleConfirmOrder = () => {
    
      const items = [
                      {
                        foodId: food.foodId,
                        foodName: food.foodName,
                        foodPrice: food.foodPrice,
                        quantity: quantity,
                        imageUrl: food.imageUrl
                      }
                    ];

            // Save to localStorage
            localStorage.setItem("orderItems", JSON.stringify(items));

            onClose();

            navigate("/payment");
  };
 

return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop-custom" onClick={onClose}></div>

      {/* Modal */}
      <div className="order-now-modal-wrapper">
        <div className="order-now-modal-box shadow">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">Confirm Your Order</h4>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          <img
            src={food.imageUrl}
            alt={food.Name}
            className="order-now-food-img"
          />

          <h5 className="fw-bold text-center mt-3 mb-1">{food.foodName}</h5>
          <p className="text-center food-unit-price mb-4">
            ₹{food.foodPrice?.toFixed ? food.foodPrice.toFixed(2) : food.foodPrice} / item
          </p>

          {/* Quantity Stepper */}
          <div className="d-flex align-items-center justify-content-center mb-4 order-now-stepper">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={handleDecrement}
            >
              −
            </button>
            <span className="mx-3 fw-semibold">{quantity}</span>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>

          {/* Live Total */}
          <div className="order-now-total mb-4">
            <span>Total</span>
            <span className="order-now-total-amount">₹{totalPrice}</span>
          </div>

          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderNowModal;
