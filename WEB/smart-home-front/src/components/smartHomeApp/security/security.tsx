import React from 'react'
import styles from './security.module.css'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import Entrances from './entrances/entrances';
import Occupants from './occupants/occupants';

type Props = {}

const Security: React.FC<Props> = () => {
    return (
        <div className={styles.mainWindow}>
            <div className={styles.topInfo}>
                <ShieldOutlinedIcon fontSize='large' htmlColor='#003B6D' />
                <h2>Security system</h2>
            </div>
            <Entrances />
            <Occupants />
            <div>logs</div>
        </div>
    )
}

export default Security