import React, { Component, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../../api/getUser/getUser";
import { Logo } from "../../components/common/logo/logo";
import { SignInForm } from "../../components/signInPage/signInForm/signInForm";
import styles from './signIn.module.css'


type SignInPageProps = {

}
const SignInPage: React.FC<SignInPageProps> = () => {

    const navigate = useNavigate();
    const goToPage = (to: string) => {
        navigate(to);
    }


    useEffect(() => {
        GetUser().then(() => {
            return goToPage('/app')
        })
    }, [])

    return (
        <div className={styles.MainWindow}>
            <Logo />
            <h1>Sign in to Smart Home</h1>
            <SignInForm />
        </ div>
    )
}

export default SignInPage