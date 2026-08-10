import axios from "axios";
import { API_CONFIG } from "../config/apiConfig";

const axiosInstance = axios.create({
    baseURL : API_CONFIG.BASE_URL,
    timeout : API_CONFIG.TIMEOUT,
    headers: {
        "Content-Type": "application/json"
    }

});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
    (req) => {
                const token = localStorage.getItem(API_CONFIG.TOKEN);
                if (token) {
                    req.headers[API_CONFIG.AUTHORIZATION] = `${API_CONFIG.BEARER} ${token}`;
                }
                return req;
    },
    (error) =>{
         return Promise.reject(error);
    } );

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(

    // SUCCESS RESPONSE
    (response) => {
      return response;
    },

    // ERROR RESPONSE
    (error) => {

    // Token expired / Invalid token / Unauthorized
        if(error.response?.status === 401){

            localStorage.removeItem("token");
            localStorage.removeItem("userData");

            window.location.href = "/";

        }

        // Forbidden (role issue)
        else if(error.response?.status === 403){

            console.log("Access denied");
        }

        // Backend server error
        else if(error.response?.status === 500){
            console.log(error);
        }

        return Promise.reject(error);
    }

);




export default axiosInstance;