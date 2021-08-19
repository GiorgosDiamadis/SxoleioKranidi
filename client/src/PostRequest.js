const axios = require("axios");

// const API = "https://194.63.239.197:8080";
const API = "http://localhost:8080";
const axiosClient = axios.create({baseURL: API});

export default function (URL, payload, headers = null) {
    let auth = localStorage.getItem("auth");
    let token = null;
    if (auth) {
        token = auth.split(" ")[1];
    }

    return axiosClient.post(
        URL,
        {...payload},
        {
            withCredentials: true,
            headers: token !== null ? {authorization: `Bearer ${token}`} : {},
        }
    );
}

