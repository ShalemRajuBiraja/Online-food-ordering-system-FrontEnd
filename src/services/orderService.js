import axiosInstance from "../axios/axiosInstance";
import {API_ENDPOINTS} from "../constants/apiEndPoints";

export const getOrdersList = () => {
    return axiosInstance.get(API_ENDPOINTS.GET_ORDERS_LIST);
}
export const placeOrder = (orderData) => {
    return axiosInstance.post(API_ENDPOINTS.ORDER_PLACE, orderData);
}

