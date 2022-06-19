import instance from "../axios-auth/axios-auth";
import { Endpoints } from "../endpoints";
import { EditRoomDto } from "../../global/types";



export const EditRoomById = (smartHomeId: number, roomId: number, dto: EditRoomDto) => {
    const path = Endpoints.smartHome + `/${smartHomeId}` + Endpoints.room + `/${roomId}`;
    return instance.patch(path, {
        ...dto
    });
}