import { useState } from "react";
import { Link } from "react-router-dom";
import "./ManageAddress.css";
import { addAddress } from "../services/addressService";
import { toast } from "react-toastify";
import { useEffect} from "react";
import { deleteAddress,updateAddress,getAddress } from "../services/addressService";


const emptyForm = {
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
};

const ManageAddresses = () => {
  // Single address only — null means the user has no saved address yet.
  // TODO: replace this with the address fetched from GET /api/addresses (if one exists)
  const [address, setAddress] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // false = adding new, true = updating existing
  const [formData, setFormData] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
  const fetchAddress = async () => {
    try {
      const response = await getAddress();

      if (response.data.success) {
        setAddress(response.data.data);
      }
    } catch (error) {
      console.log(error);
      // No toast here on purpose — a new user simply won't have
    }
  };

  fetchAddress();
}, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

        const handleAddAddress = () => {
          // Extra safety guard — button is already hidden once an address exists,
          // but this stops the form from opening even if triggered some other way.
          if (address) return;

          setFormData(emptyForm);
          setIsEditing(false);
          setShowForm(true);
        };

      const handleUpdateClick = () => {
        setFormData({
          fullName: address.fullName,
          phone: address.phone,
          addressLine: address.addressLine,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
        });
        setIsEditing(true);
        setShowForm(true);
      };

      const handleCancel = () => {
        setShowForm(false);
        setFormData(emptyForm);
        setFormErrors({});   // ✅ add this
        setIsEditing(false);
      };

// VALIDATION PART 
  const validate = () => {
  const errors = {};
  const phoneRegex = /^[0-9]{10}$/;
  const pincodeRegex = /^[0-9]{6}$/;

  if (!formData.fullName.trim())
    errors.fullName = "Full name is required";
  else if (formData.fullName.trim().length < 3)
    errors.fullName = "Full name must be at least 3 characters";

  if (!formData.phone.trim())
    errors.phone = "Phone number is required";
  else if (!phoneRegex.test(formData.phone.trim()))
    errors.phone = "Enter a valid 10-digit phone number";

  if (!formData.addressLine.trim())
    errors.addressLine = "Address line is required";

  if (!formData.city.trim())
    errors.city = "City is required";

  if (!formData.state.trim())
    errors.state = "State is required";

  if (!formData.pincode.trim())
    errors.pincode = "Pincode is required";
  else if (!pincodeRegex.test(formData.pincode.trim()))
    errors.pincode = "Enter a valid 6-digit pincode";

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing) {
      try {
        // TODO: call your updateAddress API here — left blank for you to implement
        const response = await updateAddress(address.id, formData);

        if (response.data.success) {
          setAddress({ ...address, ...formData });
          setShowForm(false);
          setIsEditing(false);
          toast.success("Address updated");
        }
      } catch (error) {
        console.log(error);
        toast.error("Update address failed");
      }
    } else {
      try {
        const response = await addAddress(formData);

        if (response.data.success) {
          // TODO: once your backend returns the created address (with its real id),
          // use that instead of Date.now() — e.g. setAddress(response.data.data)
          const newAddress = { id: Date.now(), ...formData };

          setAddress(newAddress);
          setShowForm(false);
          setFormData(emptyForm);
          toast.success("Address saved");
        }
      } catch (error) {
        console.log(error);
        toast.error("Add address failed");
      }
    }
  };

  const handleDeletePermanently = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this address?"
    );
    if (!confirmed) return;

    try {
      // TODO: call your deleteAddress API here — left blank for you to implement
      const response = await deleteAddress(address.id);

      if (response.data.success) {
        setAddress(null);
        toast.success("Address deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete address failed");
    }
  };

  return (
    <div className="manage-addresses-page">
      <div className="manage-addresses-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Delivery Address</h2>
          {/* "Add Address" only shows when there is no saved address yet */}
          {!address && !showForm && (
            <button className="btn btn-primary btn-sm" onClick={handleAddAddress}>
              + Add Address
            </button>
          )}
        </div>

        {/* Inline Add/Edit Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="address-form shadow-sm mb-4">
            <h5 className="fw-semibold mb-3">
              {isEditing ? "Update Address" : "Add New Address"}
            </h5>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
               <input
                    type="text"
                    className={`form-control ${formErrors.fullName ? "is-invalid" : ""}`}
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />
                  {formErrors.fullName && (
                    <div className="invalid-feedback">{formErrors.fullName}</div>
                  )}
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>

               {/* Phone */}
                    <input
                      type="tel"
                      className={`form-control ${formErrors.phone ? "is-invalid" : ""}`}
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                    {formErrors.phone && (
                      <div className="invalid-feedback">{formErrors.phone}</div>
                    )}
              </div>

              <div className="col-12">
                <label htmlFor="addressLine" className="form-label">
                  Address Line
                </label>

              {/* Address Line */}
                <input
                  type="text"
                  className={`form-control ${formErrors.addressLine ? "is-invalid" : ""}`}
                  id="addressLine"
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleChange}
                  placeholder="House no, street, locality"
                />
                {formErrors.addressLine && (
                  <div className="invalid-feedback">{formErrors.addressLine}</div>
                )}
              </div>

              <div className="col-12 col-md-4">
                <label htmlFor="city" className="form-label">
                  City
                </label>

              {/* City */}
                <input
                  type="text"
                  className={`form-control ${formErrors.city ? "is-invalid" : ""}`}
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
                {formErrors.city && (
                  <div className="invalid-feedback">{formErrors.city}</div>
                )}
              </div>

              <div className="col-12 col-md-4">
                <label htmlFor="state" className="form-label">
                  State
                </label>
              {/* State */}
                <input
                  type="text"
                  className={`form-control ${formErrors.state ? "is-invalid" : ""}`}
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                />
                {formErrors.state && (
                  <div className="invalid-feedback">{formErrors.state}</div>
                )}
              </div>

              <div className="col-12 col-md-4">
                <label htmlFor="pincode" className="form-label">
                  Pincode
                </label>
              {/* Pincode */}
                      <input
                        type="text"
                        className={`form-control ${formErrors.pincode ? "is-invalid" : ""}`}
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                      />
                      {formErrors.pincode && (
                        <div className="invalid-feedback">{formErrors.pincode}</div>
                      )}
              </div>
            </div>

            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary">
                {isEditing ? "Update Address" : "Save Address"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* No address yet, and form isn't open */}
        {!address && !showForm && (
          <p className="text-secondary text-center py-5">
            No saved address yet. Click "Add Address" to add one.
          </p>
        )}

        {/* The single saved address, shown with Update / Delete Permanently */}
        {address && !showForm && (
          <div className="address-card shadow-sm">
            <div className="address-card-body">
              <h6 className="fw-bold mb-1">{address.fullName}</h6>
              <p className="mb-1 text-secondary small">{address.phone}</p>
              <p className="mb-0 address-text">
                {address.addressLine}, {address.city}, {address.state} -{" "}
                {address.pincode}
              </p>
            </div>
            <div className="address-card-actions">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={handleUpdateClick}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleDeletePermanently}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        )}

        <div className="text-center mt-4">
          <Link to="/" className="back-to-home-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageAddresses;
