
import axiosInstance from "../axios/axiosInstance";
import {API_ENDPOINTS} from "../constants/apiEndPoints";



export const getCartItems = () => {

    return axiosInstance.get(API_ENDPOINTS.GET_CART_ITEMS);

}


export const removeCartItem = (cartId) => {

    return axiosInstance.delete(`${API_ENDPOINTS.REMOVE_CART_ITEM}/${cartId}`);
}