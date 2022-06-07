import styles from './contactUs.module.css'
import { ContactUsAbout } from './contactUsAbout/contactUsAbout'
import { ContactUsForm } from './contactUsForm/contactUsForm'

export const ContactUs = () => {
    return (<div className={styles.mainWindow}>
        <ContactUsForm />
        <ContactUsAbout />
    </div>)
}