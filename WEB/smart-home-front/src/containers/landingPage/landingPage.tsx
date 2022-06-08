import React, { Component } from "react";
import { Backdrop } from "../../components/landingPage/backdrop/backdrop";
import { ContactUs } from "../../components/landingPage/contactUs/contactUs";
import { InitialLadning } from "../../components/landingPage/initaialLanding/initialLanding";
import { Modal } from "../../components/landingPage/modal/modal";
import { Navbar } from "../../components/landingPage/navbar/navbar";
import { SignInForm } from "../../components/signInPage/signInForm/signInForm";
import { WeOffer } from "../../components/landingPage/weOffer/weOffer";

type LandingPageState = {
    showSignIn: boolean;
    signedIn: boolean;
}

type LandingPageProps = {

}
class LandingPage extends Component<LandingPageProps, LandingPageState>  {

    constructor(props: LandingPageProps) {
        super(props);
        this.state = {
            showSignIn: false,
            signedIn: false,
        }
        this.togleSignIn = this.togleSignIn.bind(this);
    }
    togleSignIn() {
        let { showSignIn } = this.state;
        showSignIn = !showSignIn;

        this.setState({ showSignIn: showSignIn });
    }

    render() {
        return (
            <>
                <Navbar showSignIn={this.togleSignIn} />
                <InitialLadning />
                <WeOffer />
                <ContactUs />
            </>
        )
    }
}

export default LandingPage