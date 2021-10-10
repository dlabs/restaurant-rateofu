import axios from "axios";

const ax =  axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-type": "application/json",
    },
});

// Add a response interceptor
ax.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default ax;