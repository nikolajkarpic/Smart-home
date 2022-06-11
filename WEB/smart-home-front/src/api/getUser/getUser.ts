import instance from "../axios-auth/axios-auth";
import { Endpoints } from "../endpoints";

export const GetUser = () => {
    return instance.get(Endpoints.getUser);
}