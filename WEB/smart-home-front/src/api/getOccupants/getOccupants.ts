import instance from "../axios-auth/axios-auth";
import { Endpoints } from "../endpoints";

export const GetOccupants = (shartHomeId: number) => {
    const path = Endpoints.smartHome + `/${shartHomeId}` + Endpoints.getOccupants
    return instance.get(path);
}