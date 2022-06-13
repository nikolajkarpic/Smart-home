import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './smartHomeAppPage.module.css'
import instance from '../../api/axios-auth/axios-auth'
import { GetUser } from '../../api/getUser/getUser';
import axios from 'axios'
import { Endpoints } from '../../api/endpoints';
import { AppNavbar } from '../../components/smartHomeApp/navbar/navbar';
import Security from '../../components/smartHomeApp/security/security';
import { GetCommands } from '../../api/getCommands/getCommands';
import { ArrayTypeNode } from 'typescript';
import { GetOccupants } from '../../api/getOccupants/getOccupants';


type SmartHomeOccupant = {
    'id': number;
    'createdAt': string;
    'updatedAt': string;
    'name': string;
    'canEnterHouse': boolean;
    'pin': string;
    'RFID': string;
    'smartHomeId': number;
}


const SmartHomeAppPage: React.FC<{}> = () => {

    const navigate = useNavigate();
    const goToPage = (to: string) => {
        navigate(to);
    }

    const initialSmartHomeOccupant = {
        id: 0,
        createdAt: '',
        updatedAt: '',
        name: '',
        canEnterHouse: true,
        pin: '',
        RFID: '',
        smartHomeId: 0,
    }

    const [commands, setCommands] = useState<Array<string>>([''])
    const [occupants, setOccupants] = useState<Array<SmartHomeOccupant>>([initialSmartHomeOccupant])


    // useEffect(() => {
    //     GetUser().then((response) => {
    //         console.log(response);
    //     }).catch((error) => {
    //         goToPage('/signin')
    //     })
    // }, [])


    // get commands and data each second
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         GetCommands(1).then((response) => {
    //             setCommands(response.data)
    //             console.log(commands);
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);


    return (
        <div style={{
            backgroundColor: 'rgb(198, 239, 241)',
            paddingTop: '5%',
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            justifyItems: 'center',


        }}>
            {/* <AppNavbar /> */}
            {/* <div>MainBody</div> */}
            <Security />
        </div>
    )
}

export default SmartHomeAppPage;

