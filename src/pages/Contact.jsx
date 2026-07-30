import { useState } from "react";
import { Link } from "react-router-dom";
import {handleContactApi} from "../services/contactService";
import {toast} from "react-toastify";


const Contact = () => {

    const [contactData, setContactData] = useState({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        issueType: "",
        orderId: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setContactData((prev) => ({ ...prev, [name]: value  }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const response = await handleContactApi(contactData);

        if (response.data.success) {

            toast.success("Thanks for feedback, Our team will contact you");

            setContactData({
                fullName: "",
                email: "",
                phone: "",
                subject: "",
                issueType: "",
                orderId: "",
                message: ""
            });

        }

    } catch (error) {

        console.error(error);

        toast.error(
              "please login to submit feedback"
        );

    }

};
    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h2 className="fw-bold text-center mb-2">
                                Contact Us
                            </h2>

                            <p className="text-center text-secondary mb- text-danger">
                                Have a problem with your order or food? Let us know and we'll help you as soon as possible.
                            </p>

                            <form onSubmit={handleSubmit}>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fullName"
                                            value={contactData.fullName}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={contactData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Mobile Number
                                        </label>

                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phone"
                                            value={contactData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter mobile number"
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Issue Type
                                        </label>

                                        <select
                                            className="form-select"
                                            name="issueType"
                                            value={contactData.issueType}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select Issue
                                            </option>

                                            <option>
                                                Order Related
                                            </option>

                                            <option>
                                                Food Quality
                                            </option>

                                            <option>
                                                Payment Issue
                                            </option>

                                            <option>
                                                Delivery Delay
                                            </option>

                                            <option>
                                                Refund Request
                                            </option>

                                            <option>
                                                Account Issue
                                            </option>

                                            <option>
                                                Technical Issue
                                            </option>

                                            <option>
                                                Other
                                            </option>

                                        </select>

                                    </div>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Subject
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="subject"
                                        value={contactData.subject}
                                        onChange={handleChange}
                                        placeholder="Enter subject"
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Order ID
                                        <span className="text-secondary">
                                            {" "}
                                            (Optional)
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="orderId"
                                        value={contactData.orderId}
                                        onChange={handleChange}
                                        placeholder="Enter Order ID"
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Message
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        name="message"
                                        value={contactData.message}
                                        onChange={handleChange}
                                        placeholder="Describe your issue..."
                                        required
                                    ></textarea>

                                </div>

                                <div className="d-grid">

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Submit Request
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                    <div className="text-center mt-4">

                        <Link
                            to="/"
                            className="text-decoration-none fw-semibold"
                        >
                            ← Back to Home
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Contact;