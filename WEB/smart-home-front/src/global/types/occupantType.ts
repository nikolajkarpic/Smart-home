export type Occupant = {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    canEnterHouse: boolean;
    pin: string;
    RFID: string;
    smartHomeId: number;
}