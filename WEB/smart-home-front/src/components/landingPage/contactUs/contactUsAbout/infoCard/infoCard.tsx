import { SvgIcon, SvgIconClassKey, SvgIconTypeMap } from '@mui/material';
import styles from './infoCard.module.css'

interface Props {
    title: string;
    description: string;
    icon: JSX.Element;
}

export const InfoCard: React.FC<Props> = ({ title, description, icon }) => {
    return (<div className={styles.card}>
        <div style={{
            width: '20%',
            alignContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <SvgIcon
                style={{
                    paddingLeft: '30%',
                    alignContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
                htmlColor='#1279fd'
                fontSize='large'>
                {icon}
            </SvgIcon>
        </div>
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    </div>)
}