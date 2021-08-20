const axios = require("axios");
const API = "";
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

