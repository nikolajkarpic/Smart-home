import instance from "../axios-auth/axios-auth";
import { Endpoints } from "../endpoints";

export const GetRooms = (smartHomeId: number) => {
    const path = Endpoints.smartHome + `/${smartHomeId}` + Endpoints.getRooms
    return instance.get(path);
}