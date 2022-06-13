import instance from "../axios-auth/axios-auth";
import { Endpoints } from "../endpoints";

export const GetDoorStatus = (smartHomeId: number) => {
    const path = Endpoints.smartHome + `/${smartHomeId}` + Endpoints.getDoorStatus;
    return instance.get(path);
}