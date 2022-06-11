import React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './signUpForm.module.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SingUpRequest } from '../../../api/signUp/signUp'
import { SingInRequest } from '../../../api/signIn/signIn'
import CloseIcon from '@mui/icons-material/Close';

type UserCredentials = {
    email: string;
    pass: string;
    repeatPass: string;
}

export const SignUpForm: React.FC<{}> = () => {

    const navigate = useNavigate();
    const goToPage = (whereTo: string) => navigate(whereTo);

    const initialSignUpState = {
        email: '',
        pass: '',
        repeatPass: ''
    }

    const [signUpState, setSignUpState] = useState<UserCredentials>(initialSignUpState);
    const [showPass, setShowPass] = useState<boolean>(false)
    const [showRepeatPass, setShowRepeatPass] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [errorSignUp, setErrorSignUp] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('')


    const updateSignInCreditentials = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        const formKey = id as keyof UserCredentials;
        const updatedSignInState = { ...signUpState };
        updatedSignInState[formKey] = value;
        setSignUpState(updatedSignInState);
    };

    const submitSignUpRequest = async (event: FormEvent) => {
        event.preventDefault();
        setSubmitting(true);
        await signUpSubmision();
        setSubmitting(false);
    }

    const signUpSubmision = async () => {

        try {
            const result = await SingUpRequest({ ...signUpState });
            await SingInRequest({ ...signUpState }).then((response) => {
                localStorage.setItem('access_token', response.data.access_token);
                goToPage('/app');
            }).catch((error) => {
                goToPage('/signin');
            })
        } catch (error: any) {
            setErrorSignUp(true);
            if (typeof (error.response.data.message) === 'string') {

                setErrorMsg(error.response.data.message)
            } else {
                setErrorMsg(error.response.data.message[0])

            }
        }
    }

    const togleError = () => {
        setErrorSignUp(false);
    }

    const changePassVisibility = () => {
        let passVisiblity = showPass;
        setShowPass(!passVisiblity);
    };

    const changeRepeatPassVisibility = () => {
        let passVisiblity = showRepeatPass;
        setShowRepeatPass(!passVisiblity);
    };



    return (
        <div className={styles.MainWindow}>
            <div className={styles.formDiv}  >

                <form onSubmit={submitSignUpRequest} className={styles.form} >
                    {errorSignUp ? <div className={styles.errorMsg}>{errorMsg}{<CloseIcon htmlColor='red' onClick={togleError} />}</div> : null}
                    <div className={styles.credDiv} onClick={togleError}>

                        <label>
                            Email:
                        </label>
                        <input
                            className={styles.forminput}
                            type='text'
                            id='email'
                            value={signUpState.email}
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
                                value={signUpState.pass}
                                onChange={updateSignInCreditentials}>
                            </input>
                            <div
                                className={styles.visibilityButton}
                                onClick={changePassVisibility}>

                                {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </div>
                        </div>
                        <label>
                            Repeat password:
                        </label>
                        <div
                            className={styles.passDiv}>

                            <input
                                className={styles.passInput}
                                type={showRepeatPass ? 'text' : 'password'}
                                id='repeatPass'
                                value={signUpState.repeatPass}
                                onChange={updateSignInCreditentials}>
                            </input>
                            <div
                                className={styles.visibilityButton}
                                onClick={changeRepeatPassVisibility}>

                                {showRepeatPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </div>
                        </div>
                        {signUpState.pass !== signUpState.repeatPass ? <p>Passwords do not match!</p> : null}
                    </div>
                    <button onClick={submitSignUpRequest} disabled={signUpState.pass !== signUpState.repeatPass}>
                        {submitting ? 'Signing up...' : 'Sign up'}
                    </button>
                </form>

            </div>
            <div className={styles.needAccount}>
                <p>Already have an account?</p>
                <Link to='/signin'> Sign in!</Link>
            </div>
            <div>

            </div>
        </div>)
}