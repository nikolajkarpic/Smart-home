import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from "axios";
import styles from './contactUsForm.module.css'
import { StatusButtonSpinner } from './statusButtonSpinner/statusButtonSpinner';

type FormState = {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    city: string;
}

type ServiceMessage = {
    class: string;
    text: string;
}


export const ContactUsForm = () => {


    const formId = 'contactMe';
    const formSparkUrl = "http://localhost:3333/contactMe"

    const initialFormState = {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        city: ''
    }
    const [formState, setFormState] = useState<FormState>(initialFormState);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [msgToUser, setMsgToUser] = useState<ServiceMessage>();
    const [buttnoInitial, setButtonInitial] = useState<boolean>(true)
    const [susscess, setSusscess] = useState<boolean>(false)

    const submitForm = async (event: FormEvent) => {
        setButtonInitial(false);
        setSubmitting(true);
        event.preventDefault();
        await postSubmission();
        setSubmitting(false);
    }

    const postSubmission = async () => {
        const payload = {
            ...formState
        }
        try {
            const result = await axios.post(formSparkUrl, payload);
            setSusscess(true);
            console.log(result);
        } catch (error) {
            console.log(error);
            setSusscess(false);
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
            <form onSubmit={submitForm} className={styles.form} id='contactUsForm'>
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

                <button type='submit' form='contactUsForm'>
                    Contact us!
                </button>
            </form>
        </div >
    )
}