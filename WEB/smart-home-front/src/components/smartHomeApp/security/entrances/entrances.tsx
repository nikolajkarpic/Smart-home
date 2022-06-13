import React from 'react'
import Entrance from './entrance/entrance';
import styles from './entrances.module.css'

type Props = {
    smartHomeId: number;
}


const Entrances: React.FC<Props> = ({ smartHomeId }) => {
    return (
        <div className={styles.mainWindow}>
            <div>

                <Entrance entranceType='door' locked={false} name='prednja' smartHomeId={smartHomeId} />
            </div>



        </div>);
}

export default Entrances;