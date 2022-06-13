import React, { ChangeEvent, FormEvent, useState } from "react";
import MeetingRoomSharpIcon from '@mui/icons-material/MeetingRoomSharp';
import NoMeetingRoomSharpIcon from '@mui/icons-material/NoMeetingRoomSharp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import styles from './occupant.module.css'
import { EditOccupantById } from "../../../../../api/editOccupanyById/editOccupantById";

type Props = {
    id: number;
    name: string;
    canEnterHouse: boolean;
    pin: string;
    RFID?: string | undefined;
    smartHomeId: number;
    deleteOccupant: () => void;
}

type EditOccupantDto = {
    name?: string;

    pin?: string;

    RFID?: string;

    canEnterHouse?: boolean;
}
type EditOccupantStrictDto = {
    name: string;

    pin: string;

    RFID: string | undefined;

}



const Occupant: React.FC<Props> = ({ canEnterHouse, name, smartHomeId, id, pin, RFID, deleteOccupant }) => {

    const initialEditOccupantDto: EditOccupantStrictDto = {
        name: name,
        pin: pin,
        RFID: RFID,
    }

    const [editOccupantDto, setEditOccupantDto] = useState<EditOccupantStrictDto>(initialEditOccupantDto)
    const [editOccupant, setEditOccupant] = useState<boolean>(false);
    const [nameState, setNameState] = useState<string>(name);
    const [pinState, setPinState] = useState<string>(pin);
    const [RFIDState, setRFIDState] = useState<string | undefined>(RFID);
    const [canEnterHouseState, setCanEnterHouseState] = useState<boolean>(canEnterHouse);


    const toggleCanEnterHouse = () => {
        EditOccupantById(smartHomeId, id, {
            "canEnterHouse": !canEnterHouseState,
        }).then(() => {
            setCanEnterHouseState(!canEnterHouseState);
        }).catch((error) => {
            console.log(error)
        })
    }

    const updateEditForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        const formKey = id as keyof EditOccupantStrictDto;
        const updatedEditOccupant = { ...editOccupantDto };
        updatedEditOccupant[formKey] = value;
        setEditOccupantDto(updatedEditOccupant);
    };

    const submitChanges = () => {
        EditOccupantById(smartHomeId, id, {
            ...editOccupantDto
        }).then(() => {
            setEditOccupant(false);
            setNameState(editOccupantDto.name);
            setPinState(editOccupantDto.pin);
            setRFIDState(editOccupantDto.RFID);
        }).catch((error) => {
            console.log(error)
        })
    }

    const discardChanges = (event: FormEvent) => {
        event.preventDefault();
        setEditOccupantDto(initialEditOccupantDto);
        setEditOccupant(false);
    }

    let display;
    if (!editOccupant) {

        display = <div
            className={styles.mainWindow}>
            <PersonOutlineIcon htmlColor="#003B6D" />
            < div className={styles.text} onClick={() => setEditOccupant(true)} >
                {nameState}
            </div >
            <div
                onClick={toggleCanEnterHouse}>

                {canEnterHouseState ? <MeetingRoomSharpIcon htmlColor='#61e655' /> : <NoMeetingRoomSharpIcon htmlColor='#bd3535' />}
            </div>
        </div >

    } else {
        display = <div className={styles.form}>
            <div className={styles.inputField}>

                <label>Name:</label>
                <input
                    placeholder={nameState}
                    id="name"
                    value={editOccupantDto.name}
                    onChange={updateEditForm}></input>
                <label>Rfid:</label>
                <input
                    placeholder={RFIDState}
                    id="RFID"
                    value={editOccupantDto.RFID}
                    onChange={updateEditForm}></input>
                <label>Pin:</label>
                <input
                    placeholder={pinState}
                    id="pin"
                    value={editOccupantDto.pin}
                    onChange={updateEditForm}></input>
            </div>
            <div className={styles.buttonsDiv}>
                <button
                    onClick={submitChanges}>
                    <DoneIcon htmlColor="#61e655" />
                </button>
                <button
                    onClick={discardChanges}>
                    <CloseIcon htmlColor='#bd3535' />
                </button>
                <button
                    onClick={deleteOccupant}>
                    <DeleteOutlineOutlinedIcon htmlColor="#003B6D" />
                </button>
            </div>
        </div>
    }


    return (
        <>
            {display}
        </>
    );
}

export default Occupant;