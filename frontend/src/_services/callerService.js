// https://laravel.com/docs/10.x/sanctum#spa-authentication
import axios from 'axios';
const token = localStorage.getItem("woodStockPlainTextToken");
console.log("🚀 ~ file: callerService.js:4 ~ token:", token)
axios.defaults.withCredentials = true;
const Axios = axios.create({
    baseURL: "http://localhost:8080",
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Cache-Control': 'no-cache',
    //   'Authorization': `Bearer ${token}`
    // }
});

export default Axios;