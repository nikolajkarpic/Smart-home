import axios from 'axios'
import { Endpoints } from '../endpoints'

interface SingInCredentials {
    email: string;
    pass: string;
}

export const SingInRequest = async (singInCredentials: SingInCredentials) => {
    const result = await axios.post(Endpoints.signIn, { ...singInCredentials });

}