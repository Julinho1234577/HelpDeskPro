import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5072/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default api;