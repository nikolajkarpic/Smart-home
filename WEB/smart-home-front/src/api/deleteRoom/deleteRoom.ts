import instance from "../axios-auth/axios-auth";
import { Endpoints } from "../endpoints";



export const DeleteRoom = (smartHomeId: number, roomId: number) => {
    const path = Endpoints.smartHome + `/${smartHomeId}` + Endpoints.room + `/${roomId}`
    return instance.delete(path)
}