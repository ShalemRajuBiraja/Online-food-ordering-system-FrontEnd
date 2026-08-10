
import axiosInstance from "../axios/axiosInstance";
import {API_ENDPOINTS} from "../constants/apiEndPoints";

export const addAddress = (formData) => {
    return axiosInstance.post(API_ENDPOINTS.ADDRESS_SAVE, formData);
}
export const deleteAddress = (formData) => {
    return axiosInstance.delete(API_ENDPOINTS.ADDRESS_DELETE, formData);
}

export const updateAddress = (formData) => {
    return axiosInstance.put(API_ENDPOINTS.ADDRESS_UPDATE, formData);
}

export const getAddress = (formData) => {
    return axiosInstance.get(API_ENDPOINTS.ADDRESS_GET, formData);
}


