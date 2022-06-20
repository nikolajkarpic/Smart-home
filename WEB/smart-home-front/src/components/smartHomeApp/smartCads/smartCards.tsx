import SmartCard from './smartCard/smartCard';
import styles from './smartCards.module.css';
import { Room, SmartHome } from "../../../global/types";
import LightsCard from './lightsCard/lightsCard';
import ThermostatCard from './thermostatCard/thermostatCard';


type Props = {
    selectedRoom: string;
    smartHome: SmartHome;
    rooms: Array<Room>;
}

const SmartCards: React.FC<Props> = ({ selectedRoom, rooms, smartHome }) => {

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

    const smartHomeThermostat = smartHome.currentTemperature ?
        <ThermostatCard
            name={smartHome.name}
            currentTemperature={smartHome.currentTemperature}
            prefferedTemperature={smartHome.prefferedTemperature}
            smartHomeId={smartHome.id}
            roomId={0} /> : null;

    return (
        <div className={styles.mainWindow}>
            {selectedRoom === 'all' ? smartHomeThermostat : null}
            <>
                {lightsCards}
            </>
            {Thermostats}
        </div>)
}

export default SmartCards;