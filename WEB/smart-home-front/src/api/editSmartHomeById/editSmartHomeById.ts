import instance from "../axios-auth/axios-auth";
import { Endpoints } from "../endpoints";
import { EditSmartHomeDto } from "../../global/types";



export const EditSmartHomeById = (smartHomeId: number, dto: EditSmartHomeDto) => {
    const path = Endpoints.smartHome + `/${smartHomeId}`;
    return instance.patch(path, {
        ...dto
    });
}