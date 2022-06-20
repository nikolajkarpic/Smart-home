import React from 'react'
import { SmartHome } from '../../../../global/types';
import Entrance from './entrance/entrance';
import styles from './entrances.module.css'

type Props = {
    smartHome: SmartHome;
}


const Entrances: React.FC<Props> = ({ smartHome }) => {
    return (
        <div className={styles.mainWindow}>
            <div>

                <Entrance entranceType='door' locked={smartHome.doorLocked} name='prednja' smartHomeId={smartHome.id} />
            </div>



        </div>);
}

export default Entrances;