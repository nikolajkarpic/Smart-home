import { useState } from 'react';
import { AppNavbar } from '../../components/smartHomeApp/navbar/navbar';
import styles from './createSmartHomePage.module.css'
import InitialCreateSmartHomePage from './initialPage/InitialCreateSmartHomePage';

const CreateSmartHomePage = () => {

    const [formPage, setFormPage] = useState(0);

    return (
        <div className={styles.mainBody}>
            <AppNavbar />
            {formPage === 0 ? <InitialCreateSmartHomePage handleFormPageState={() => setFormPage(1)} /> : null}
            {formPage === 1 ? <p>lolic</p> : null}

            <div className={styles.pageNumberContainer}>
                <div className={formPage === 0 ? styles.pageNumberDotActive : styles.pageNumberDot}></div>
                <div className={formPage === 1 ? styles.pageNumberDotActive : styles.pageNumberDot}></div>
                <div className={styles.pageNumberDot}></div>
                <div className={styles.pageNumberDot}></div>

            </div>
        </div>
    );
}
export default CreateSmartHomePage;