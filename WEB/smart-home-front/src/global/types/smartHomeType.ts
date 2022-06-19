export type SmartHome = {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    address?: string;
    zipCode?: string;
    commands?: string;
    commandsFront?: string;
    doorLocked: boolean;
    currentTemperature?: number | null;
    prefferedTemperature: number;
    userId: number;
}