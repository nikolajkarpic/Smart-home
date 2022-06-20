import instance from "../axios-auth/axios-auth";
import { Endpoints } from "../endpoints";

export const GetSmartHomes = () => {
    const path = Endpoints.smartHome
    return instance.get(path);
}