import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const Order = ({ selectedProduct }) => {

  // ✅ VARIABLES
  const [quantity, setQuantity] = useState(1);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const userId = loggedInUser?.userId;


  const handleConfirmOrder = async () => {
    try {
        // 1. Prepare order data
            const orderData = {
              userId: userId,
              productId: selectedProduct.productId,
              productName: selectedProduct.productName,
              price: selectedProduct.price,
              quantity: quantity 
          };    

          // 2. Make API call to place order    
          const orderResponse = await axios.post( "http://localhost:8080/placeOrder", orderData);
         toast.success("Order placed successfully!");
          setTimeout(() => {
              window.location.reload();
          }, 2000);

    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };  
  
  return (
    <div
      className="modal fade"
      id="orderModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content order-modal">

          {/* Header */}
          <div className="modal-header border-0">
            <h3 className="modal-title fw-bold text-warning">
              🍔 Confirm Your Order
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body text-center">

            <img
              src={selectedProduct?.imageUrl}
              alt="Food"
              className="img-fluid rounded order-image"
            />

            <h4 className="mt-3 fw-bold">
              {selectedProduct?.productName}
            </h4>

            <p className="text-muted">
              Price per item: ₹{selectedProduct?.price}
            </p>

            <div className="mb-3">
              <label className="form-label fw-semibold">Quantity</label>
              <input
                type="number"
                className="form-control w-50 mx-auto text-center"
                placeholder="Enter quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <div className="total-box mt-3">
              <h5 className="fw-bold">
                Total Amount: ₹{selectedProduct?.price * quantity || 0}
              </h5>
            </div>

          </div>

          {/* Footer */}
         <div className="modal-footer border-0 justify-content-center gap-2">
            <button
              className="btn btn-outline-secondary px-4"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              className="btn btn-warning px-4 fw-bold"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </button>
          </div>

        </div>
      </div>

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              pauseOnHover
              theme="dark"
          />
    </div>
  );

};

export default Order;