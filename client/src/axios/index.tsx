import axios from "axios";

const backend_url = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
    baseURL: backend_url,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});


export default axiosInstance;
