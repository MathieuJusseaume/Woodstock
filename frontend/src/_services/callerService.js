// https://laravel.com/docs/10.x/sanctum#spa-authentication
import axios from 'axios';

axios.defaults.withCredentials = true;
const Axios = axios.create({
    baseURL: "http://192.168.1.15:8080",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
    }
});

export default Axios;