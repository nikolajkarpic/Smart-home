import SmartCard from './smartCard/smartCard';
import styles from './smartCards.module.css';
import { Room } from "../../../global/types";
import LightsCard from './lightsCard/lightsCard';
import ThermostatCard from './thermostatCard/thermostatCard';


type Props = {
    selectedRoom: string;
    rooms: Array<Room>;
}

const SmartCards: React.FC<Props> = ({ selectedRoom, rooms }) => {

    let lightsCards = rooms.map((room) => {
        if (selectedRoom === 'all' || selectedRoom === `${room.id}`) {

            return (< LightsCard key={room.id} room={room} />);
        }
    })

    let Thermostats = rooms.map((room) => {
        if (selectedRoom === 'all' || selectedRoom === `${room.id}`) {
            if (room.currentTemperature !== null && room.prefferedTemperature !== null) {
                return (< ThermostatCard
                    key={room.id}
                    name={room.name}
                    prefferedTemperature={room.prefferedTemperature}
                    currentTemperature={room.currentTemperature}
                    room
                    roomId={room.id}
                    smartHomeId={room.smartHomeId} />);

            }
        }
    })

    return (
        <div className={styles.mainWindow}>
            <>
                {lightsCards}
            </>
            {Thermostats}
            <SmartCard />

        </div>)
}

export default SmartCards;