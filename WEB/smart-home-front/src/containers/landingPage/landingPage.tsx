import React, { Component, useRef, useEffect, createFactory } from "react";
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
    private WeOfferRef: any
    private ContactUsRef: any;
    private HomeRef: any;
    constructor(props: LandingPageProps) {
        super(props);
        this.state = {
            showSignIn: false,
            signedIn: false,
        }
        this.WeOfferRef = React.createRef();
        this.HomeRef = React.createRef();
        this.ContactUsRef = React.createRef();
        this.togleSignIn = this.togleSignIn.bind(this);
        this.executeScrollAbout = this.executeScrollAbout.bind(this);
    }
    togleSignIn() {
        let { showSignIn } = this.state;
        showSignIn = !showSignIn;

        this.setState({ showSignIn: showSignIn });
    }

    executeScrollAbout = () => this.WeOfferRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    executeScrollContact = () => this.ContactUsRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    executeScrollHome = () => this.HomeRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })

    render() {
        return (
            <>
                <Navbar
                    showSignIn={this.togleSignIn}
                    scrollAboutIntoViel={this.executeScrollAbout}
                    scrollContactUsIntoView={this.executeScrollContact}
                    scrollHomeIntoView={this.executeScrollHome} />
                <div ref={this.HomeRef}>
                    <InitialLadning />
                </div>
                <div ref={this.WeOfferRef}>
                    <WeOffer />
                </div>
                <div ref={this.ContactUsRef}>
                    <ContactUs />
                </div>
            </>
        )
    }
}

export default LandingPage