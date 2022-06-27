import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './smartHomeAppPage.module.css'
import { GetUser } from '../../api/getUser/getUser';
import { Endpoints } from '../../api/endpoints';
import { AppNavbar } from '../../components/smartHomeApp/navbar/navbar';
import Security from '../../components/smartHomeApp/security/security';
import { GetCommands } from '../../api/getCommands/getCommands';
import { GetOccupants } from '../../api/getOccupants/getOccupants';
import RoomsNavbar from '../../components/smartHomeApp/roomsNavbar/roomsNavbar';
import { Room, SmartHome, Occupant } from '../../global/types';
import { GetRooms, GetSmartHomes } from '../../api';
import SmartCards from '../../components/smartHomeApp/smartCads/smartCards';
import { useErrorHandler } from 'react-error-boundary';

const SmartHomeAppPage: React.FC<{}> = () => {


    const hadnleError = useErrorHandler();
    const navigate = useNavigate();
    const goToPage = (to: string) => {
        navigate(to);
    }

    const initialRoom: Room = {
        id: 0,
        createdAt: "",
        updatedAt: "",
        name: "",
        lights: false,
        currentTemperature: null,
        prefferedTemperature: 27,
        mq7: null,
        pir: null,
        smartHomeId: 1
    }

    const initialSmartHome: SmartHome = {
        id: 0,
        createdAt: "",
        updatedAt: "",
        name: "",
        address: '',
        zipCode: '',
        commands: "",
        commandsFront: "",
        doorLocked: true,
        currentTemperature: 0,
        prefferedTemperature: 27,
        userId: 0
    }


    const [rooms, setRooms] = useState<Array<Room>>([initialRoom]);
    const [commands, setCommands] = useState<Array<string>>([''])
    const [selectedRoom, setSelectedRoom] = useState<string>('all');
    const [smartHome, setSmartHome] = useState<SmartHome>();

    const getRoomId = (roomId: string) => {
        setSelectedRoom(roomId);
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


    // const [occupants, setOccupants] = useState<Array<SmartHomeOccupant>>([initialSmartHomeOccupant])

    useEffect(() => {
        GetSmartHomes().then((response) => {
            console.log(response)
            if (response.data.length === 0) {
                goToPage('/createSmartHome');
            } else {
                setSmartHome(response.data[0]);
            }
        }).catch((error) => {
            error.response.status === 401 ? goToPage('/signin') : console.log(error)
        });
        if (smartHome) {

            GetRooms(smartHome?.id).then((response) => {
                console.log(response);
                const data = response.data;
                setRooms([...data]);
                console.log(rooms);

            }).catch((error) => {
                console.log(error)
            })
        }
    }, [])

    useEffect(() => {
        if (smartHome) {
            GetRooms(smartHome.id).then((response) => {
                setRooms([...response.data]);
                // console.log(commands);
            }).catch((error) => {
                if (error.response.status === 401) {
                    navigate('/signin');
                }
            })
        }
    }, [smartHome])

    // get commands and data each second
    useEffect(() => {
        const interval = setInterval(() => {

            GetSmartHomes().then((response) => {
                setSmartHome(response.data[0]);
            }).catch((error) => {
                console.log(error)
            });

        }, 1000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div
            className={styles.mainBody} >
            <AppNavbar />
            <RoomsNavbar rooms={rooms} getRoomId={getRoomId} smartHomeId={smartHome ? smartHome?.id : 1} />
            {smartHome ? <SmartCards selectedRoom={selectedRoom} rooms={rooms} smartHome={smartHome} /> : null}
            {/* <div>MainBody</div> */}
            {smartHome ? <Security smartHome={smartHome} /> : null}
        </div>
    )
}

export default SmartHomeAppPage;

