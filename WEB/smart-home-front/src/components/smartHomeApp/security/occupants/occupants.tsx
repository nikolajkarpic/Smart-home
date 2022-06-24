import React, { ChangeEvent, useEffect, useState } from "react";
import Occupant from "./occupant/occupant";
import styles from './occupants.module.css'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { GetOccupants } from "../../../../api/getOccupants/getOccupants";
import { DeleteOccupant } from "../../../../api/deleteOccupant/deleteOccupant";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { CreateOccupant } from "../../../../api/addOccupant/addOccupant";

type Props = {
    smartHomeId: number;
}

type Occupant = {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    canEnterHouse: boolean;
    pin: string;
    RFID: string;
    smartHomeId: number;
}

type addOccupant = {
    name: string;
    pin: string;
    RFID?: string;
}

const Occupants: React.FC<Props> = ({ smartHomeId }) => {

    const initialSmartHomeOccupant = {
        id: 0,
        createdAt: '',
        updatedAt: '',
        name: '',
        canEnterHouse: true,
        pin: '',
        RFID: '',
        smartHomeId: 0,
    }
    const initialAddOccupant = {
        name: '',
        pin: '',
    }

    const [occupants, setOccupants] = useState<Array<Occupant>>([initialSmartHomeOccupant])
    const [addOccupant, setAddOccupant] = useState<boolean>(false);
    const [addOccupantDto, setAddOccupantDto] = useState<addOccupant>(initialAddOccupant);

    useEffect(() => {
        GetOccupants(smartHomeId).then((response) => {
            setOccupants(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    // useEffect(() => {
    //     const interval = setInterval(() => {

    //         GetOccupants(smartHomeId).then((response) => {
    //             setOccupants(response.data)
    //         }).catch((error) => {
    //             console.log(error)
    //         })

    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, [])

    let transformedOccupants = occupants.
        map(({ name, smartHomeId, RFID, pin, canEnterHouse, id }) => (
            <Occupant
                key={id}
                id={id}
                name={name}
                smartHomeId={smartHomeId}
                RFID={RFID} pin={pin}
                canEnterHouse={canEnterHouse}
                deleteOccupant={() => deleteOccupant(id, smartHomeId)} />
        ))

    const deleteOccupant = (occupantId: number, smartHomeId: number) => {
        DeleteOccupant(occupantId, smartHomeId).then(() => {

            GetOccupants(1).then((response) => {
                setOccupants(response.data)
                console.log(response.data);
            }).catch((error) => {
                console.log(error)
            })
        });
    }

    const updateAddForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        const formKey = id as keyof addOccupant;
        const updatedAddOccupant = { ...addOccupantDto };
        updatedAddOccupant[formKey] = value;
        setAddOccupantDto(updatedAddOccupant);
    };
    //1 needs to be replaced by smarthome id that is passed as prop

    const submitAddOccupant = () => {
        CreateOccupant(1, addOccupantDto).then(() => {
            setAddOccupantDto(initialAddOccupant);
            setAddOccupant(false);
            GetOccupants(1).then((response) => {
                setOccupants(response.data)
                console.log(response.data);
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    let addOccupantElement;
    if (!addOccupant) {
        addOccupantElement =
            <div
                className={styles.addUser}
                onClick={() => setAddOccupant(true)}>
                <PersonAddAltIcon htmlColor='#003B6D' />
                <div className={styles.text}>
                    {"Add an occupant"}
                </div>
            </div>
    } else {
        addOccupantElement =
            <div className={styles.form}>
                <div className={styles.inputField}>

                    <label>Name:</label>
                    <input
                        value={addOccupantDto.name}
                        id="name"
                        onChange={updateAddForm}
                    ></input>
                    <label>Rfid:</label>
                    <input
                        value={addOccupantDto.RFID}
                        id="RFID"
                        onChange={updateAddForm}

                    ></input>
                    <label>Pin:</label>
                    <input
                        value={addOccupantDto.pin}
                        id="pin"
                        onChange={updateAddForm}

                    ></input>
                </div>
                <div className={styles.buttonsDiv}>
                    <button
                        onClick={submitAddOccupant}
                    >
                        <DoneIcon htmlColor="#61e655" />
                    </button>
                    <button onClick={() => setAddOccupant(false)}
                    >
                        <CloseIcon htmlColor='#bd3535' />
                    </button>
                </div>
            </div>
    }


    return (<div className={styles.mainWindow} >
        <div>

            {addOccupantElement}
            {transformedOccupants}
        </div>
    </div>)
}

export default Occupants;