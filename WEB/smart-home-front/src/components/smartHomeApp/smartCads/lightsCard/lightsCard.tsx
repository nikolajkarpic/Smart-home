import { useEffect, useState } from 'react';
import { Room } from '../../../../global/types';
import styles from './lightsCard.module.css'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import { EditRoomById } from '../../../../api';

type Props = {
    room: Room;
}

const LightsCard: React.FC<Props> = ({ room }) => {

    const [clicked, setClicked] = useState<boolean>(false);
    const [name, setName] = useState<string>(room.name + ' light');
    const [lightsOn, setLightsOn] = useState<boolean>(room.lights);
    const [dimable, setDimable] = useState<boolean>(true);
    const [dimerValue, setDimerValue] = useState<number>(0);
    const [dimerValueTmp, setDimerValueTmp] = useState<number>(0);

    useEffect(() => {
        setName(room.name + ' lights')
    })

    useEffect(() => {
        console.log(dimerValue)
    }, [dimerValue])

    const handleSliderChange = (event: Event, newValue: number | number[]) => {

        setDimerValueTmp(newValue as number);
    };

    const handleLightsChange = () => {
        EditRoomById(room.smartHomeId, room.id, {
            lights: !lightsOn,
        }).then((responese) => {
            setLightsOn(!lightsOn)
            console.log(responese)
        }).catch((error) => {
            console.log(error)
        });
    }

    let dimableSlider = dimable ? <div className={styles.dimmer}>
        <label>
            Dimmer
        </label>
        <Slider
            size='medium'
            color='primary'
            sx={{
                widht: '90%',
            }}
            value={dimerValueTmp}
            min={0}
            max={100}
            step={10}
            onChange={handleSliderChange}
            onChangeCommitted={() => { setDimerValue(dimerValueTmp) }}
        >

        </Slider>
    </div >
        : null;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <LightbulbOutlinedIcon fontSize='large' htmlColor='#003B6D' />
                <Switch checked={lightsOn} color='success' size='medium' value={lightsOn} onChange={handleLightsChange} />
            </div>
            <h3>
                {name}
            </h3>
            {dimableSlider}
        </div>);
}

export default LightsCard;