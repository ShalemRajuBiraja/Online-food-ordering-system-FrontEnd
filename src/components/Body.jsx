import "./Body.css";
import { useEffect, useState } from "react";
import { getFoodItems } from "../services/foodItemsService.js";
import { toast } from "react-toastify";
import OrderNowModal from "./OrderNowModal";

const Body = () => {

    const [foodItems, setFoodItems] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const size = 8;
    const page = 0;

    useEffect(() => {

        const fetchFoodItems = async () => {

            try {
                setLoading(true);

                const response = await getFoodItems(page, size);

                if (response.data.success) {
                    setFoodItems(response.data.data.content);
                }

            } catch (error) {

                console.log(error.message);

                toast.error(
                    error.response?.data?.message || "Failed to load food items"
                );

            } finally {
                setLoading(false);
            }
        };

        fetchFoodItems();

    }, [page]);


    const handleOrderNow = (food) => {

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login to complete the order process!");
            return;
        }

        setSelectedFood(food);
        setShowOrderModal(true);
    };


    return (
        <div>

            <h1 className="text-center my-4">
                Welcome to Our Website ❤️
            </h1>


            {/* Loading */}
            {loading ? (

                <div className="text-center my-5">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <p className="mt-3 fw-semibold">
                        Loading food items... Please wait.
                    </p>

                </div>

            ) : (

                /* Food Items */
                <div className="container">

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">

                        {foodItems.map((food) => (

                            <div key={food.foodId} className="col">

                                <div className="food-card card h-100 shadow-sm">

                                    <img
                                        src={food.imageUrl}
                                        alt={food.name}
                                        className="food-card-img card-img-top"
                                    />

                                    <div className="card-body d-flex flex-column">

                                        <h5 className="card-title">
                                            {food.foodName}
                                        </h5>

                                        <p className="card-text text-secondary small food-description">
                                            {food.description}
                                        </p>

                                        <p className="fw-bold food-price mb-3">
                                            ₹{food.foodPrice}
                                        </p>

                                        <div className="mt-auto d-flex flex-column gap-2">

                                            <button
                                                type="button"
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleOrderNow(food)}
                                            >
                                                Order Now
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>
            )}


            <OrderNowModal
                show={showOrderModal}
                onClose={() => setShowOrderModal(false)}
                food={selectedFood}
            />

        </div>
    );
};

export default Body;