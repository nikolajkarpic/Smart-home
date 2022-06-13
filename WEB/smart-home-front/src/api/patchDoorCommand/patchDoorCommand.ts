import instance from "../axios-auth/axios-auth";
import { Endpoints } from "../endpoints";

type doorCommandDto = {
    command: string
}

export const PatchDoorCommand = (smartHomeId: number, dto: doorCommandDto) => {
    const path = Endpoints.smartHome + `/${smartHomeId}` + Endpoints.patchDoorCommand
    return instance.patch(path, { ...dto });
}