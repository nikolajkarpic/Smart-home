import { CreateSmartHomeDto } from "../../global/types";
import { Endpoints } from "../endpoints";
import instance from "../axios-auth/axios-auth";

export const CreateSmartHome = (dto: CreateSmartHomeDto) => {
    const path = Endpoints.smartHome + Endpoints.create;
    return instance.post(path, dto);
}