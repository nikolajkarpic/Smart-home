import React from 'react'
import Entrance from './entrance/entrance';
import styles from './entrances.module.css'

const Entrances: React.FC<{}> = () => {
    return (
        <div className={styles.mainWindow}>
            <div>

                <Entrance entranceType='door' locked={false} name='prednja' />
                <Entrance entranceType='slidingDoor' locked name='prednja' />
                <Entrance entranceType='door' locked={false} name='prednja' />
                <Entrance entranceType='door' locked name='prednja' />
                <Entrance entranceType='slidingDoor' locked name='prednja' />

                <Entrance entranceType='door' locked={false} name='prednja' />
                <Entrance entranceType='window' locked name='prednja' />
            </div>



        </div>);
}

export default Entrances;