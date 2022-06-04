import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from "axios";
import styles from './contactMe.module.css'

type FormState = {
    email: string;
    name: string;
    message: string;
}

export const ContactMe: React.FC = (props) => {
    const formId = '83zOEThu';
    const formSparkUrl = `https://submit-form.com/${formId}`

    const initialFormState = {
        email: '',
        name: '',
        message: '',
    }
    const [formState, setFormState] = useState<FormState>(initialFormState);


    const submitForm = async (event: FormEvent) => {
        event.preventDefault();
        await postSubmission();
    }

    const postSubmission = async () => {
        const payload = {
            message: 'test test test'
        }
        try {
            const result = await axios.post(formSparkUrl, payload);
            console.log(result);
        } catch (error) {
            console.log(error);
        }

    }

    const updateFormControl = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        const formKey = id as keyof FormState;
        const updatedFormState = { ...formState };
        updatedFormState[formKey] = value;
        setFormState(updatedFormState);
    }

    return (
        <div className={styles.mainWindow}>
            <h3>Contact us</h3>
            <form onSubmit={submitForm} className={styles.formWindow}>
                <label style={{ 'textAlign': 'center' }}>name:</label>
                <input style={{ 'width': '100%' }} onChange={updateFormControl}
                    type='text'
                    id='name'
                    value={formState.name} />
                <label style={{ 'textAlign': 'center' }}>email:</label>
                <input style={{ 'width': '100%' }} onChange={updateFormControl}
                    type='email'
                    id='name'
                    value={formState.email} />
                <div className={styles.messageBoxDiv}>
                    <label style={{ 'textAlign': 'center' }}> messaage:</label>
                    <textarea style={{ 'width': '100%', 'height': '80%' }} id="message"></textarea>
                </div>
                <button style={{ 'width': '30%', 'alignSelf': 'center' }} >
                    submit
                </button>
            </form>

        </div>
    );

}