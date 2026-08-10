import axiosInstance from "../axios/axiosInstance";

import {API_ENDPOINTS} from "../constants/apiEndPoints";

export const handleContactApi = (contactData) => {

    return axiosInstance.post(API_ENDPOINTS.CONTACT_API, contactData);
}