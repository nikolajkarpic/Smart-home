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



const SmartHomeAppPage: React.FC<{}> = () => {

    const navigate = useNavigate();
    const goToPage = (to: string) => {
        navigate(to);
    }

    const [commands, setCommands] = useState<Array<string>>([''])

    // useEffect(() => {
    //     GetUser().then((response) => {
    //         console.log(response);
    //     }).catch((error) => {
    //         goToPage('/signin')
    //     })
    // }, [])
    useEffect(() => {
        GetCommands(1).then((response) => {
            setCommands(response.data)
            console.log(commands);
        }).catch((error) => {
            console.log(error)
        })
    }, [])

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

