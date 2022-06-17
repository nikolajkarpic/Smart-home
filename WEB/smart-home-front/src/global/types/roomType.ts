export type Room = {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    lights: boolean;
    currentTemperature: number | null;
    prefferedTemperature: number | null;
    mq7: number | null;
    pir: boolean | null;
    smartHomeId: number;

}