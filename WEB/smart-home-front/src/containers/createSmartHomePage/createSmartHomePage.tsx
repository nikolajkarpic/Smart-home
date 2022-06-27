import { useEffect, useState } from 'react';
import { AppNavbar } from '../../components/smartHomeApp/navbar/navbar';
import styles from './createSmartHomePage.module.css'
import InitialCreateSmartHomePage from '../../components/createSmartHomePage/initialPage/InitialCreateSmartHomePage';
import NameFormPage from '../../components/createSmartHomePage/nameFormPage/nameFormPage';
import AddressPage from '../../components/createSmartHomePage/addressPage/addressPage';
import { AddressType, CreateSmartHomeDto } from '../../global/types';
import FinishUp from '../../components/createSmartHomePage/finishUp/finishUp';

const CreateSmartHomePage = () => {

    const initialDto: CreateSmartHomeDto = {
        name: '',
        address: '',
        currentTemperature: 16,
        zipCode: '',
    };

    const [formPage, setFormPage] = useState(0);
    const [smartHomeName, setSmartHomeName] = useState('');
    const [smartHomeDto, setSmartHomeDto] = useState(initialDto)
    const handleAddress = (address: AddressType) => {
        setSmartHomeDto({
            name: smartHomeName,
        })
        if (address.street.length !== 0) {
            setSmartHomeDto({
                name: smartHomeName,
                address: address.street + ', ' + address.city,
                zipCode: address.zipCode,
                currentTemperature: 16,
            })
        }
    }

    return (
        <div className={styles.mainBody}>
            <AppNavbar />
            {formPage === 0 ?
                <InitialCreateSmartHomePage
                    handleFormPageState={() => setFormPage(1)} /> : null}
            {formPage === 1 ?
                <NameFormPage
                    handleNextPage={() => setFormPage(2)}
                    handlePreviousPage={() => setFormPage(0)}
                    handleName={(name: string) => setSmartHomeName(name)} /> : null}
            {formPage === 2 ?
                <AddressPage
                    handleNextPage={() => setFormPage(3)}
                    handlePreviousPage={() => setFormPage(1)}
                    handleAddress={(address) => handleAddress(address)} /> : null}
            {formPage === 3 ?
                <FinishUp
                    dto={smartHomeDto} /> : null}
            <div className={styles.pageNumberContainer}>
                <div className={formPage === 0 ? styles.pageNumberDotActive : styles.pageNumberDot}></div>
                <div className={formPage === 1 ? styles.pageNumberDotActive : styles.pageNumberDot}></div>
                <div className={formPage === 2 ? styles.pageNumberDotActive : styles.pageNumberDot}></div>
                <div className={formPage === 3 ? styles.pageNumberDotActive : styles.pageNumberDot}></div>

            </div>
        </div>
    );
}
export default CreateSmartHomePage;