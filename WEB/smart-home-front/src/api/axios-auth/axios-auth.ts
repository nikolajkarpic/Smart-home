import axios, { AxiosError } from 'axios'
import { Endpoints } from '../endpoints'



const instance = axios.create({
    baseURL: Endpoints.baseUrl,
});

instance.interceptors.request.use(async config => {
    config.headers = {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }
    return config;
}, error => {
    return error;
}
)


export default instance;
