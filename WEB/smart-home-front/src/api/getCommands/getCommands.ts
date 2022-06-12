import instance from "../axios-auth/axios-auth";
import { Endpoints } from "../endpoints";

export const GetCommands = (id: number) => {
    const path = Endpoints.smartHome + `/${id}` + Endpoints.getCommands
    return instance.get(path);
}