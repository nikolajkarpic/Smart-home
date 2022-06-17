import axios from 'axios'
import { Endpoints } from '../endpoints'



const instance = axios.create({
    baseURL: Endpoints.baseUrl,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    }
});

export default instance;
