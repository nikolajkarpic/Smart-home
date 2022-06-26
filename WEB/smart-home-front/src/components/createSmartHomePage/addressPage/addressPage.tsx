import { ChangeEvent, createRef, FormEvent, useEffect, useRef, useState } from 'react';
import styles from './addressPage.module.css';
import { AddressType } from '../../../global/types';

type Props = {
    handleAddress: (address: AddressType) => void;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
};

const AddressPage: React.FC<Props> = ({ handleAddress, handlePreviousPage, handleNextPage }) => {

    const initialAddress: AddressType = {
        street: '',
        city: '',
        zipCode: '',
    };
    const [elRefs, setElRefs] = useState<number>(0);
    const [addressState, setAddressState] = useState<AddressType>(initialAddress);

    const inputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (inputRef !== null) {
            inputRef.current?.focus()
        }
    }, [])


    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        const key = id as keyof AddressType;
        const updated = { ...addressState };
        updated[key] = value;
        setAddressState(updated);
    };

    const handleFnishUpButton = () => {
        handleAddress(addressState);
        handleNextPage();

    };

    const handleInputNextForm = (event: FormEvent) => {
        event.preventDefault();
        handleFnishUpButton();
    }

    const handleInputBackForm = (event: FormEvent) => {
        event.preventDefault();
        handlePreviousPage();
    }


    return (
        <form className={styles.mainBody}>
            <div className={styles.textDiv}>

                <h1>
                    Where is your home located?
                </h1>

                <p>
                    Its optional, but some advanced functionallity needs location.
                </p>

                <input
                    ref={elRefs === 0 ? inputRef : null}
                    onChange={handleInput}
                    value={addressState.street}
                    id='street'
                    placeholder='street and number'
                    type="text" />
                <input
                    ref={elRefs === 1 ? inputRef : null}
                    onChange={handleInput}
                    value={addressState.city}
                    id='city'
                    placeholder='city'
                    type="text" />
                <input
                    ref={elRefs === 2 ? inputRef : null}
                    onChange={handleInput}
                    value={addressState.zipCode}
                    id='zipCode'
                    placeholder='zip code'
                    type="text" />

            </div>

            <div className={styles.buttons}>
                <button
                    onClick={handleInputNextForm}>
                    FINISH UP
                </button>
                <button
                    onClick={handleInputBackForm}>
                    BACK
                </button>
            </div>
        </form>
    );
}

export default AddressPage;