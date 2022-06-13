import React from 'react'
import styles from './security.module.css'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import Entrances from './entrances/entrances';
import Occupants from './occupants/occupants';

type Props = {
    smartHomeId: number;
}

const Security: React.FC<Props> = ({ smartHomeId }) => {
    return (
        <div className={styles.mainWindow}>
            <div className={styles.topInfo}>
                <ShieldOutlinedIcon fontSize='large' htmlColor='#003B6D' />
                <h2>Security system</h2>
            </div>
            <Entrances smartHomeId={smartHomeId} />
            <Occupants smartHomeId={smartHomeId} />
        </div>
    )
}

export default Security