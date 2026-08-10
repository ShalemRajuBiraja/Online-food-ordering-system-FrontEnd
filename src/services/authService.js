import axiosInstance from "../axios/axiosInstance";
import {API_ENDPOINTS} from "../constants/apiEndPoints";

export const signup = (signupData) => {
    return axiosInstance.post(API_ENDPOINTS.SIGNUP, signupData); // END POINT, SIGNUP DATA

}
export const login = (loginData) => {
    return axiosInstance.post(API_ENDPOINTS.LOGIN, loginData);

}
export const adminLogin = (adminLoginData) => {

    return axiosInstance.post(API_ENDPOINTS.ADMIN_LOGIN, adminLoginData);

}