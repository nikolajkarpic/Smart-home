import { Component } from "react";
import { Logo } from "../../components/common/logo/logo";
import { SignUpForm } from "../../components/signUpPage/signUpForm/signUpForm";
import styles from './signUp.module.css'



export class SignUpPage extends Component {

    render() {
        return (

            <div className={styles.MainWindow}>


                <Logo />

                <h1>Sing up for Smart Home</h1>
                <SignUpForm />
            </ div>
        )
    }
}