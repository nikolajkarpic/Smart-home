import React, { useState } from 'react'
import DoorFrontOutlinedIcon from '@mui/icons-material/DoorFrontOutlined';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import DoorSlidingOutlinedIcon from '@mui/icons-material/DoorSlidingOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import styles from './entrance.module.css'
import { PatchDoorCommand } from '../../../../../api/patchDoorCommand/patchDoorCommand';

type Props = {
    entranceType: string;
    locked: boolean;
    name: string;
}

const Entrance: React.FC<Props> = ({ entranceType, locked, name }) => {

    const [lockedState, setLockedState] = useState<Boolean>(locked)
    const toggleLockedState = () => {
        setLockedState(!lockedState);
        let command = lockedState ? 'unlock' : 'lock';
        PatchDoorCommand(1, {
            command: command,
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