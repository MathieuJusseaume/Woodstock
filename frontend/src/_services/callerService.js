import axios from 'axios';

const Axios = axios.create({
    baseURL: "http://192.168.1.15:8080/api"
});

export default Axios;