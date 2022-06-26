import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import styles from './nameFormPage.module.css';
import CloseIcon from '@mui/icons-material/Close';


type Props = {
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    handleName: (name: string) => void;
}

const NameFormPage: React.FC<Props> = ({ handleNextPage, handlePreviousPage, handleName }) => {

    const [smartHomeName, setSmartHomeName] = useState<string>('');
    const [nameError, setNameError] = useState<boolean>(false);

    const inputReff = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputReff !== null) {
            inputReff.current?.focus()
        }
    }, [])

    const handleInputNextForm = (event: FormEvent) => {
        event.preventDefault();
        handleNextButton();
    }

    const handleInputBackForm = (event: FormEvent) => {
        event.preventDefault();
        handlePreviousPage();
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        let updatedNameState = smartHomeName;
        updatedNameState = value;
        setSmartHomeName(updatedNameState);
    };

    const handleNextButton = () => {
        if (smartHomeName === '') {
            setNameError(true);
        } else {
            handleName(smartHomeName);
            handleNextPage();
        }
    }

    return (
        <form onSubmit={handleInputNextForm} className={styles.mainBody}>
            <div className={styles.textDiv}>
                <h1>
                    What should we call your smart home?
                </h1>

                <input
                    ref={inputReff}
                    id='name'
                    placeholder='name'
                    type="text"
                    value={smartHomeName}
                    onChange={handleInputChange} />
            </div>
            {nameError ? <div className={styles.errorMsg}>Name cant be empty{<CloseIcon htmlColor='red' onClick={() => setNameError(false)} />}</div> : null}
            <div className={styles.buttons}>

                <button
                    onClick={handleInputNextForm}>
                    NEXT
                </button>
                <button onClick={handleInputBackForm}>
                    PREVIOUS
                </button>
            </div>
        </form>
    );
}

export default NameFormPage;