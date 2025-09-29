import axios from "axios";

const API_URL = "https://authbackend-2.onrender.com/auth"; // your backend
// const API_URL = "http://localhost:3000/auth"; // your backend

export const registerUser = (data) => {
    return axios.post(`${API_URL}/register`, data);
};

export const loginUser = (data) => {
    return axios.post(`${API_URL}/login`, data);
};

export const requestOTP = (email) => {
    return axios.post(`${API_URL}/send-otp`, { email });
};

export const resetPassword = (data) => {
    return axios.post(`${API_URL}/reset-password`, data);
};
