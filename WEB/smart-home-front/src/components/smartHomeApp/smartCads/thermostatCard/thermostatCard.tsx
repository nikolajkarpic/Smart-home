import { FC, useEffect, useState } from 'react';
import styles from './thermostat.module.css';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import ThermostatAutoOutlinedIcon from '@mui/icons-material/ThermostatAutoOutlined';
import { Room, SmartHome } from '../../../../global/types';
import { Switch, Slider } from '@mui/material';
import { EditRoomById, EditSmartHomeById } from '../../../../api';

type Props = {
    name: string;
    currentTemperature: number;
    prefferedTemperature: number;
    room?: boolean;
    roomId: number;
    smartHomeId: number;
}

const marksC = [
    {
        value: 16,
        label: '16°C',
    },
    {
        value: 20,
        label: '20°C',
    },
    {
        value: 24,
        label: '24°C',
    },
];

const marksF = [
    {
        value: 60.8,
        label: '60.8°F',
    },
    {
        value: 68,
        label: '68°F',
    },
    {
        value: 75.2,
        label: '75.2°F',
    },
];

const ThermostatCard: FC<Props> = ({ name, currentTemperature, prefferedTemperature, room, smartHomeId, roomId }) => {

    const [cardname, setCardName] = useState<string>('');
    const [celsius, setCelsius] = useState<boolean>(true);
    const [currentCardTemperature, setCurrentCardTemperature] = useState<number>(currentTemperature);
    const [prefferedCardTemperature, setPrefferedCardTemperature] = useState<number>(prefferedTemperature);
    const [prefferedCardTemperatureTmp, setPrefferedCardTemperatureTmp] = useState<number>(prefferedTemperature);
    const [acOn, setAcOn] = useState<boolean>(true); // needs to be added to backend


    useEffect(() => {
        if (celsius) {

            setCurrentCardTemperature(currentTemperature);
            setPrefferedCardTemperatureTmp(prefferedTemperature);
        } else {
            setCurrentCardTemperature((currentTemperature * 9 / 5) + 32);
            setPrefferedCardTemperatureTmp((prefferedTemperature * 9 / 5) + 32);
        }


        setCardName(name + ' AC');

    }, [])

    useEffect(() => {
        if (room) {
            EditRoomById(smartHomeId, roomId, {
                prefferedTemperature: prefferedCardTemperature
            }).then((response) => {
                console.log(response)
                setPrefferedCardTemperatureTmp(prefferedCardTemperature)
            }).catch((error) => {
                console.log(error)
            })
        } else {
            EditSmartHomeById(smartHomeId, {
                prefferedTemperature: prefferedCardTemperature
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        }

    }, [prefferedCardTemperature])

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setPrefferedCardTemperatureTmp(newValue as number);
    };

    function valuetext(value: number) {
        return `${value}` + celsius ? '°C' : '°F';
    }

    const handleTempChage = () => {
        setPrefferedCardTemperature(prefferedCardTemperatureTmp);
    }


    return (
        <div className={styles.card}>
            <div>

                <div className={styles.header}>
                    {acOn ? <ThermostatAutoOutlinedIcon fontSize='large' htmlColor='#003B6D' /> : <DeviceThermostatOutlinedIcon fontSize='large' htmlColor='#003B6D' />}

                    <Switch checked={acOn} color='success' size='medium' value={acOn} onChange={() => setAcOn(!acOn)} />
                </div>
                <h3>
                    {cardname}
                </h3>
            </div>
            <div className={styles.tempControl}>
                <label>
                    Current temperature:
                </label>
                <h2>{currentCardTemperature} {celsius ? '°C' : '°F'}</h2>
                <label>
                    Preffered temperature:
                </label>
                <Slider
                    aria-label="Custom marks"
                    min={celsius ? 10 : 50}
                    max={celsius ? 30 : 85}
                    defaultValue={celsius ? 20 : 68}
                    value={prefferedCardTemperatureTmp}
                    onChange={handleSliderChange}
                    onChangeCommitted={handleTempChage}
                    getAriaValueText={valuetext}
                    step={1}
                    valueLabelDisplay="auto"
                    marks={celsius ? marksC : marksF}
                />

            </div>
        </div>)
}

export default ThermostatCard;