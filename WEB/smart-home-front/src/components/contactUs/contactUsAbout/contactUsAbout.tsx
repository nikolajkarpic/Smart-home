import React, { FC } from 'react'
import styles from './contactUsAbout.module.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CameraIndoorOutlinedIcon from '@mui/icons-material/CameraIndoorOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { InfoCard } from './infoCard/infoCard';

export const ContactUsAbout: React.FC<{}> = () => {

    return (<div className={styles.contactUsAbout}>
        <InfoCard title='Security' description='We offer top of the line security' icon={<SecurityOutlinedIcon />} />
        <InfoCard title='Automatisation' description='Control your home from your phone or laptop' icon={<HomeOutlinedIcon />} />
        <InfoCard title='Surveilance' description='Rest assured, for you can always see whats happening inside your home' icon={<CameraIndoorOutlinedIcon />} />
        <InfoCard title='Statistics' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, quae?' icon={<QueryStatsOutlinedIcon />} />
    </div>)
}
