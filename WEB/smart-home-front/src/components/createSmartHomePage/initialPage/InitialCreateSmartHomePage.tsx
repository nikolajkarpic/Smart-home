import styles from './InitialCreateSmartHomePage.module.css'
import ComputerIcon from '@mui/icons-material/Computer';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { FormEvent } from 'react';

type Props = {
    handleFormPageState: () => void;
}

const InitialCreateSmartHomePage: React.FC<Props> = ({ handleFormPageState }) => {

    const handleInputForm = (event: FormEvent) => {
        event.preventDefault();
        handleFormPageState();
    }

    return (
        <form onSubmit={handleInputForm} className={styles.mainBody}>
            <div className={styles.textDiv}>

                <h1>
                    Set up your smart home!
                </h1>

                <p>
                    Control your home from your:
                </p>
                <div className={styles.infoDiv}>
                    <p>
                        LAPTOP
                    </p>
                    <ComputerIcon />

                </div>

                <div className={styles.infoDiv}>
                    <p>
                        TABLET
                    </p>
                    <TabletMacIcon />

                </div>


                <div className={styles.infoDiv}>
                    <p>
                        PHONE
                    </p>
                    <PhoneAndroidIcon />

                </div>
            </div>

            <button onClick={handleInputForm}>
                Begin
            </button>
        </form>
    )
};

export default InitialCreateSmartHomePage;