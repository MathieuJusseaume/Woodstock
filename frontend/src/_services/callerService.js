// https://laravel.com/docs/10.x/sanctum#spa-authentication
import axios from 'axios';

const Axios = axios.create({
    baseURL: "http://localhost:8080/api"
});

export default Axios;