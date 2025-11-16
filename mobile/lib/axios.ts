import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://192.168.100.8:8080/api'
});

export default axiosInstance;