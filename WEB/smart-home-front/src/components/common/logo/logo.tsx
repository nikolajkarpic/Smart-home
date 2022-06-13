import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { border } from '@mui/system';
import styles from './logo.module.css'

interface Props {
    redirectTo?: string;
    style?: React.CSSProperties;
}

export const Logo: React.FC<Props> = ({ redirectTo, style }) => {
    const navigate = useNavigate();
    const goToPage = () => navigate(redirectTo ? redirectTo : '/');
    return (
        <div style={style} className={styles.main} onClick={goToPage}>
            <h6 className={styles.text}>smart</h6>
            <HomeIcon htmlColor='white' />
        </div >)
}