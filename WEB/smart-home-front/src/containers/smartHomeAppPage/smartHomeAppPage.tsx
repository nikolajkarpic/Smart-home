import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './smartHomeAppPage.module.css'
import { GetUser } from '../../api/getUser/getUser';
import { Endpoints } from '../../api/endpoints';
import { AppNavbar } from '../../components/smartHomeApp/navbar/navbar';
import Security from '../../components/smartHomeApp/security/security';
import { GetCommands } from '../../api/getCommands/getCommands';
import { GetOccupants } from '../../api/getOccupants/getOccupants';
import RoomsNavbar from '../../components/roomsNavbar/roomsNavbar';
import { height } from '@mui/system';
import { Room } from '../../global/types';
import { GetRooms } from '../../api';

const SmartHomeAppPage: React.FC<{}> = () => {

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


    const [rooms, setRooms] = useState<Array<Room>>([initialRoom]);
    const [commands, setCommands] = useState<Array<string>>([''])
    const [selectedRoom, setSelectedRoom] = useState<string>('all');

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


    useEffect(() => {
        console.log(selectedRoom);
    }, [selectedRoom])

    // const [occupants, setOccupants] = useState<Array<SmartHomeOccupant>>([initialSmartHomeOccupant])


    useEffect(() => {
        GetRooms(1).then((response) => {
            console.log(response);
            const data = response.data;
            setRooms([...data]);
            console.log(rooms);

        }).catch((error) => {
            console.log(error)
        })
    }, [])


    // get commands and data each second
    useEffect(() => {
        const interval = setInterval(() => {
            GetRooms(1).then((response) => {
                setRooms([...response.data]);
                // console.log(commands);
            }).catch((error) => {
                console.log(error)
            })
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div style={{
            backgroundColor: 'rgb(198, 239, 241)',
            width: '100%',
            height: '100vh',
            paddingTop: '5%',
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            justifyItems: 'center',


        }}>
            <AppNavbar />
            <RoomsNavbar rooms={rooms} getRoomId={getRoomId} smartHomeId={1} />
            {/* <div>MainBody</div> */}
            {/* <Security smartHomeId={1} /> */}
        </div>
    )
}

export default SmartHomeAppPage;

