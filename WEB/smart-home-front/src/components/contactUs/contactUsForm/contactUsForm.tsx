import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from "axios";
import styles from './contactUsForm.module.css'

type FormState = {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    city: string;
}


export const ContactUsForm = () => {


    const formId = '83zOEThu';
    const formSparkUrl = `https://submit-form.com/${formId}`

    const initialFormState = {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        city: ''
    }
    const [formState, setFormState] = useState<FormState>(initialFormState);


    const submitForm = async (event: FormEvent) => {
        event.preventDefault();
        await postSubmission();
    }

    const postSubmission = async () => {
        const payload = {
            ...formState
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
        <div className={styles.contactUsForm}>
            <div className={styles.textDiv}>
                <h2>Interesed in our services?</h2>
                <p>Contact us to quickly automate your home. Ask us about anything, pricing, time to finish the home.</p>
            </div>
            <form onSubmit={submitForm} className={styles.form}>
                <input placeholder='First Name' onChange={updateFormControl}
                    type='text'
                    id='firstName'
                    value={formState.firstName} />
                <input placeholder='Last Name' onChange={updateFormControl}
                    type='text'
                    id='lastName'
                    value={formState.lastName} />
                <input placeholder='Email' onChange={updateFormControl}
                    type='email'
                    id='email'
                    value={formState.email} />
                <input placeholder='Phone Number' onChange={updateFormControl}
                    type='text'
                    id='phoneNumber'
                    value={formState.phoneNumber} />
                <input placeholder='City' onChange={updateFormControl}
                    type='text'
                    id='city'
                    value={formState.city} />

                <button>
                    Contact us!
                </button>
            </form>
        </div >
    )
}