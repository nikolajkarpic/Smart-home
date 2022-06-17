import SmartCard from './smartCard/smartCard';
import styles from './smartCards.module.css';
import { Room } from "../../../global/types";


type Props = {
    selectedRoom: string;
    rooms: Array<Room>;
}

const SmartCards: React.FC<Props> = ({ selectedRoom, rooms }) => {

    return (
        <div className={styles.mainWindow}>
            <SmartCard />
            <SmartCard />
            <SmartCard />
            <SmartCard />
            <SmartCard />
            <SmartCard />
            <SmartCard />
            <SmartCard />

        </div>)
}

export default SmartCards;