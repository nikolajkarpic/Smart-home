import React from 'react'
import styles from './security.module.css'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import Entrances from './entrances/entrances';
import Occupants from './occupants/occupants';
import { SmartHome } from '../../../global/types';

type Props = {
    smartHome: SmartHome;
}

const Security: React.FC<Props> = ({ smartHome }) => {
    return (
        <div className={styles.mainWindow}>
            <div className={styles.topInfo}>
                <ShieldOutlinedIcon fontSize='large' htmlColor='#003B6D' />
                <h2>Security system</h2>
            </div>
            <Entrances smartHome={smartHome} />
            <Occupants smartHomeId={smartHome.id} />
        </div>
    )
}

export default Security