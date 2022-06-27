import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateSmartHome } from '../../../api/createSmartHome/createSmartHome';
import { CreateSmartHomeDto } from '../../../global/types';
import styles from './finishUp.module.css';

type Props = {
    dto: CreateSmartHomeDto;
};

const FinishUp: React.FC<Props> = ({ dto }) => {


    const [sendingData, setSendingData] = useState(false);
    const navigator = useNavigate();

    const createSmartHome = () => {
        setSendingData(true)
        CreateSmartHome(dto)
            .then((response) => {
                setSendingData(false);
                navigator('/app')
            })
            .catch((error) => {
                console.log(error);
                setSendingData(false);
            })
    }

    return (
        <div className={styles.mainBody}>
            <div>
                <h1>
                    Almost done.
                </h1>
                <p>
                    Check your data, make sure its correct!
                </p>
            </div>
            <div className={styles.dataDiv}>
                <label >
                    Name:
                </label>
                <div className={styles.dataDivChild}>
                    {dto.name}
                </div>
                <label >
                    Address:
                </label>
                <div className={styles.dataDivChild}>

                    {dto.address}
                </div>
                <label >
                    Zip code:
                </label>
                <div className={styles.dataDivChild}>

                    {dto.zipCode}
                </div>
            </div>
            <button onClick={createSmartHome}>
                {sendingData ? 'Sending!' : 'DONE!'}
            </button>
        </div>
    );
}

export default FinishUp;