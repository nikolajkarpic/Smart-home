import instance from "../axios-auth/axios-auth";
import { Endpoints } from "../endpoints";

export const DeleteOccupant = (occupantId: number, smartHomeId: number) => {
    const path = Endpoints.smartHome + `/${smartHomeId}` + Endpoints.occupant + `/${occupantId}`
    return instance.delete(path);
}