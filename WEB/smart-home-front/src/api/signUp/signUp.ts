import axios from 'axios'
import { Endpoints } from '../endpoints'

interface SingUpCredentials {
    email: string;
    pass: string;
}

export const SingUpRequest = async (singInCredentials: SingUpCredentials) => {
    const result = await axios.post(Endpoints.signUp, { ...singInCredentials });
    return result;
}