import React, { useEffect, useState } from 'react'
import DoorFrontOutlinedIcon from '@mui/icons-material/DoorFrontOutlined';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import DoorSlidingOutlinedIcon from '@mui/icons-material/DoorSlidingOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import styles from './entrance.module.css'
import { PatchDoorCommand } from '../../../../../api/patchDoorCommand/patchDoorCommand';
import { GetDoorStatus } from '../../../../../api/getDoorStatus/getDoorStatus';

type Props = {
    smartHomeId: number;
    entranceType: string;
    locked: boolean;
    name: string;
}

const Entrance: React.FC<Props> = ({ entranceType, locked, name, smartHomeId }) => {



    const [lockedState, setLockedState] = useState<Boolean>(locked)

    useEffect(() => {
        GetDoorStatus(smartHomeId).then((response) => {
            console.log(response.data)
            setLockedState(response.data.doorLocked)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        setLockedState(locked);
    }, [locked])

    const toggleLockedState = () => {
        setLockedState(!lockedState);
        let command = lockedState ? 'unlock' : 'lock';
        PatchDoorCommand(smartHomeId, {
            command: command,
        }).then(() => {
            setLockedState(!lockedState);
        }).catch((error) => {
            console.log(error)
        })
        //call prop for calling axios door command
    }

    let icon;
    if (entranceType === 'slidingDoor') {
        icon = <DoorSlidingOutlinedIcon htmlColor='#003B6D' />
    } else if (entranceType === 'window') {
        icon = <WindowOutlinedIcon htmlColor='#003B6D' />
    } else {
        icon = <DoorFrontOutlinedIcon htmlColor='#003B6D' />
    }

    return (<div
        className={styles.mainWindow}
        onClick={toggleLockedState}>

        {icon}
        < div className={styles.text} >
            {name}
        </div >
        {lockedState ? <LockOutlinedIcon htmlColor='#61e655' /> : <LockOpenOutlinedIcon htmlColor='#bd3535' />}
    </div >);
}

export default Entrance;