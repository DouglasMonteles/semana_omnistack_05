import axios from 'axios';

const api = axios.create({
    method: 'post',
    baseURL: 'http://localhost:3000',
    headers: {
        'crossDomain': true,  //For cors errors 
        'Content-Type': 'application/x-www-form-urlencoded'
    },
});

export default api;