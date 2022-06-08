import React, { Component } from "react";
import { SignInForm } from "../../components/signInPage/signInForm/signInForm";
import styles from './signIn.module.css'

class SignIn extends Component {

    state = {

    }


    render() {
        return (
            <div className={styles.MainWindow}>
                <SignInForm />
            </ div>
        )
    }
}

export default SignIn