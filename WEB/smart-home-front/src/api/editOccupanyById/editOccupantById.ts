import instance from "../axios-auth/axios-auth";
import { Endpoints } from "../endpoints";

type EditOccupantDto = {
    name?: string;

    pin?: string;

    RFID?: string;

    canEnterHouse?: boolean;
}

export const EditOccupantById = (smartHomeId: number, occupantId: number, dto: EditOccupantDto) => {
    console.log(dto)
    const path = Endpoints.smartHome + `/${smartHomeId}` + Endpoints.occupant + `/${occupantId}`;
    return instance.patch(path, {
        'dto': {
            ...dto
        }
    });
}