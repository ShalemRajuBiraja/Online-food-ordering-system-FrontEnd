import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../index.css';
import { ToastContainer } from 'react-toastify';

import axios from 'axios';
import { toast } from 'react-toastify';

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const loggedInUser = JSON.parse(localStorage.getItem("userData"));

    const loggedInUserId = loggedInUser?.userId;

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            setLoading(true);
            // console.log("Fetching orders for userId:", loggedInUserId);

            const orderApiResponse = await axios.get( `http://localhost:8080/getOrders/${loggedInUserId}`);
            if(orderApiResponse.data.success){``

                setOrders(orderApiResponse.data.data);

            }

        } catch(error){

            console.error("Failed to fetch orders", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch orders"
            );

        } finally {

            setLoading(false);

        }
    };
    const handleRemoveOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:8080/deleteOrder/${orderId}`);
            toast.success("Order removed successfully!");
            fetchOrders(); // Refresh the orders list after deletion
        } catch (error) {
            console.error("Failed to remove order:", error);
            toast.error("Failed to remove order. Please try again.");
        }
    };


    return (

        <div className='app-container'>

            <Navbar />

            <div className='main-content container'>

                <div className='row'>

                    <div className='col-12'>

                        <h1 className='text-center myorders-heading'>
                            My Orders
                        </h1>

                    </div>

                </div>

                {
                    loading ? (

                        <div className='text-center mt-5'>

                            <div className='spinner-border text-warning'></div>

                            <p className='mt-3'>
                                Loading orders...
                            </p>

                        </div>

                    ) : orders.length === 0 ? (

                        <div className='text-center empty-orders'>

                            <h3>No Orders Yet 😔</h3>

                            <p>
                                Start ordering your favorite food!
                            </p>

                        </div>

                    ) : (

                        <div className='row mt-4'>

                            {
                                orders.map((order) => (

                                    <div
                                        className='col-lg-4 col-md-6 mb-4'
                                        key={order.orderId}
                                    >

                                        <div className='card myorder-card'>

                                            <img
                                                src={order.imageUrl}
                                                className='card-img-top myorder-image'
                                                alt={order.productName}
                                            />

                                            <div className='card-body'>

                                                <h5 className='card-title'>
                                                    {order.productName}
                                                </h5>

                                                <p className='card-text'>
                                                    Price:
                                                    <span className='order-price'>
                                                        ₹{order.productPrice}
                                                    </span>
                                                </p>

                                                <p className='card-text'>
                                                    Quantity:
                                                    <span className='order-quantity'>
                                                        {order.productQuantity}
                                                    </span>
                                                </p>

                                                <p className='card-text'>
                                                    Status:
                                                    <span className='order-status'>
                                                        In Progress
                                                    </span>
                                                </p>

                                                <div class="d-grid gap-2">
                                                    <button className='btn btn-warning mt-2'> View Details </button>
                                                    <button className="btn btn-danger mt-2" type="button" onClick={() => handleRemoveOrder(order.orderId)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                    )
                }

            </div>

            <Footer />

                <ToastContainer
                position="top-right"
                autoClose={750}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                theme="dark"
                />
        </div>

    );
};

export default MyOrders;