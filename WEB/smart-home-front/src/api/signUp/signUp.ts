import axios from 'axios'
import { Endpoints } from '../endpoints'

interface SingUpCredentials {
    email: string;
    pass: string;
}

export const SingInRequest = async (singInCredentials: SingUpCredentials) => {
    try {
        const result = await axios.post(Endpoints.signUp, { ...singInCredentials });
        return result;
    } catch (error) {
        return error;
    }
}