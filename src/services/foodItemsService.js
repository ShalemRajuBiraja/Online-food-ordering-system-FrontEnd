import axiosInstance from "../axios/axiosInstance.js";
import {API_ENDPOINTS} from "../constants/apiEndPoints.js";

export const getFoodItems = (page, size) => {
    return axiosInstance.get(API_ENDPOINTS.FOOD_ITEMS, {
        params: {
            page,
            size
        }
    });
}

export const addToCart = (cartData) => {

    return axiosInstance.post(API_ENDPOINTS.ADD_TO_CART, cartData);
}

