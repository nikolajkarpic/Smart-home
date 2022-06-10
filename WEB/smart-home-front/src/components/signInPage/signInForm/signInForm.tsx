import React from 'react';
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './signInForm.module.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SingInRequest } from '../../../api/signIn/signIn'
import CloseIcon from '@mui/icons-material/Close';

type UserCredentials = {
    email: string;
    pass: string;
}

export const SignInForm: React.FC<{}> = () => {

    //signin tooken must be saved somehow!

    const initialSignInState = {
        email: '',
        pass: ''
    }

    const [signInState, setSignInState] = useState<UserCredentials>(initialSignInState);
    const [showPass, setShowPass] = useState<boolean>(false)
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [errorSignIn, setErrorSignIn] = useState<boolean>(false);


    const updateSignInCreditentials = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        const formKey = id as keyof UserCredentials;
        const updatedSignInState = { ...signInState };
        updatedSignInState[formKey] = value;
        setSignInState(updatedSignInState);
    };

    const submitSignInRequest = async (event: FormEvent) => {
        event.preventDefault();
        setSubmitting(true);
        await signInSubmision();
        setSubmitting(false);
    }

    const signInSubmision = async () => {

        try {

            const result = await SingInRequest({ ...signInState });
        } catch (error: any) {
            setErrorSignIn(true);
        }
    }

    const togleError = () => {
        setErrorSignIn(!errorSignIn);
    }

    const changePassVisibility = () => {
        let passVisiblity = showPass;
        setShowPass(!passVisiblity);
    };


    let visibilityIcon = showPass ? <VisibilityOffIcon /> : <VisibilityIcon />

    return (
        <div className={styles.MainWindow}>
            <div className={styles.formDiv} >

                <form onSubmit={submitSignInRequest} className={styles.form}>
                    {errorSignIn ? <div className={styles.errorMsg}>Incorect credentials{<CloseIcon htmlColor='red' onClick={togleError} />}</div> : null}
                    <div className={styles.credDiv}>

                        <label>
                            Username:
                        </label>
                        <input
                            className={styles.forminput}
                            type='text'
                            id='email'
                            value={signInState.email}
                            onChange={updateSignInCreditentials}>
                        </input>
                        <label>
                            Password:
                        </label>
                        <div
                            className={styles.passDiv}>

                            <input
                                className={styles.passInput}
                                type={showPass ? 'text' : 'password'}
                                id='pass'
                                value={signInState.pass}
                                onChange={updateSignInCreditentials}>
                            </input>
                            <div
                                className={styles.visibilityButton}
                                onClick={changePassVisibility}>

                                {visibilityIcon}
                            </div>
                        </div>
                    </div>
                    <button onClick={submitSignInRequest}>
                        {submitting ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

            </div>
            <div className={styles.needAccount}>
                <p> Need an account?</p>
                <Link to='/signup'> Create it!</Link>
            </div>
            <div>

            </div>
        </div>)
}