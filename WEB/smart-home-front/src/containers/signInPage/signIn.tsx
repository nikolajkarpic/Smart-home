import React, { Component } from "react";
import { Logo } from "../../components/common/logo/logo";
import { SignInForm } from "../../components/signInPage/signInForm/signInForm";
import styles from './signIn.module.css'

class SignInPage extends Component {

    state = {

    }


    render() {
        return (
            <div className={styles.MainWindow}>
                <Logo />
                <h1>Sign in to Smart Home</h1>
                <SignInForm />
            </ div>
        )
    }
}

export default SignInPage