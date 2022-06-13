import instance from "../axios-auth/axios-auth";
import { Endpoints } from "../endpoints";

type addOccupant = {
    name: string;
    pin: string;
    RFID?: string;
}

export const CreateOccupant = (smartHomeId: number, dto: addOccupant) => {
    const path = Endpoints.smartHome + `/${smartHomeId}` + Endpoints.createOccupant
    return instance.post(path, { ...dto });
}