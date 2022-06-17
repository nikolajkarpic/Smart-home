import instance from "../axios-auth/axios-auth";
import { Endpoints } from "../endpoints";
import { AddRoomDto } from "../../global/types";

export const CreateRoom = (smartHomeId: number, dto: AddRoomDto) => {
    const path = Endpoints.smartHome + `/${smartHomeId}` + Endpoints.room + Endpoints.createRoom
    return instance.post(path, { ...dto });
}