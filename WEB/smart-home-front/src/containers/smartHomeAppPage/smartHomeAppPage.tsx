import React, { Component, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './smartHomeAppPage.module.css'
import instance from '../../api/axios-auth/axios-auth'
import { GetUser } from '../../api/getUser/getUser';
import axios from 'axios'
import { Endpoints } from '../../api/endpoints';



const SmartHomeAppPage: React.FC<{}> = () => {

    const navigate = useNavigate();
    const goToPage = (to: string) => {
        navigate(to);
    }



    useEffect(() => {
        GetUser().then((response) => {
            console.log(response);
        }).catch((error) => {
            goToPage('/signin')
        })
    }, [])


    return (<div className={styles.lol} />)
}

export default SmartHomeAppPage;

