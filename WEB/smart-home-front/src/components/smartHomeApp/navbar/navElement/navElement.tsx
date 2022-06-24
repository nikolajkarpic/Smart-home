import { useState } from 'react';
import styles from './navElement.module.css'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Button } from '@mui/material'
import Backdrop from '../backdrop/backdrop';


type Props = {
    children: React.ReactNode;
    icon: any;
}


const NavElement: React.FC<Props> = ({ children, icon }) => {

    const [open, setOpen] = useState(false);

    return (
        <div className={styles.navItem}>

            <Button
                onClick={() => setOpen(!open)}
                color='inherit'>
                {icon}
            </Button>
            <Backdrop clicked={() => setOpen(!open)} show={open} />
            {open && children}
        </div>
    );
}
export default NavElement;
